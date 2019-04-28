'use strict';

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
require('./db/mongoose');

var cors = require('cors');
var userRouter = require('./routers/user');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use((0, _morgan2.default)('dev'));

app.listen(port, function () {
    console.log('Server is up on port ' + port);
});
//# sourceMappingURL=index.js.map