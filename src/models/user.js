const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot include the word password')
            }
        }
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    appartment: {
        type: String,
        required: false,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    province: {
        type: String,
        required: true,
        trim: true
    },
    postalcode: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    level: {
        type: Number,
        default: false,
        required: true
    },
    ip:[{
        current:{
            type: String,
            required: true
        }
    }],
    
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]

},{timestamps: true})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}
userSchema.methods.generateJWT = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'matwazhere')
    user.tokens = user.tokens.concat({ token: token})
    await user.save()
    return token
}
userSchema.methods.setIp = async function(req) {
    const user = this
    let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    ip = ip.split(':').slice(-1);
    user.ip = user.ip.concat({ current: ip})
    await user.save()
    return user
}
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
