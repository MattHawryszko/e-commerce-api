'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mongoose = require('mongoose');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: {
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
        validate: function validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate: function validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot include the word password');
            }
        }
    },

    age: {
        type: Number,
        default: 0,
        validate: function validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number');
            }
        }
    },
    admin: {
        type: Boolean,
        default: false,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

});

userSchema.statics.findByCredentials = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password) {
        var user, isMatch;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return User.findOne({ email: email });

                    case 2:
                        user = _context.sent;

                        if (user) {
                            _context.next = 5;
                            break;
                        }

                        throw new Error('Unable to login');

                    case 5:
                        _context.next = 7;
                        return bcrypt.compare(password, user.password);

                    case 7:
                        isMatch = _context.sent;

                        if (isMatch) {
                            _context.next = 10;
                            break;
                        }

                        throw new Error('Unable to login');

                    case 10:
                        return _context.abrupt('return', user);

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
userSchema.methods.generateJWT = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var user, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    user = this;
                    token = jwt.sign({ _id: user._id.toString() }, 'matwazhere');

                    user.tokens = user.tokens.concat({ token: token });
                    _context2.next = 5;
                    return user.save();

                case 5:
                    return _context2.abrupt('return', token);

                case 6:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this);
}));
userSchema.pre('save', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(next) {
        var user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        user = this;

                        if (!user.isModified('password')) {
                            _context3.next = 5;
                            break;
                        }

                        _context3.next = 4;
                        return bcrypt.hash(user.password, 8);

                    case 4:
                        user.password = _context3.sent;

                    case 5:

                        next();

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function (_x3) {
        return _ref3.apply(this, arguments);
    };
}());

var User = mongoose.model('User', userSchema);

module.exports = User;
//# sourceMappingURL=user.js.map