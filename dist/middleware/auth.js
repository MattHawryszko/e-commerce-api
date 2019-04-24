'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jwt = require('jsonwebtoken');
var User = require('../models/user');

var auth = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var token, decoded, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        token = req.header('Authorization').replace('Bearer ', '');
                        decoded = jwt.verify(token, 'matwazhere');
                        _context.next = 5;
                        return User.findOne({ _id: decoded._id, 'tokens.token': token });

                    case 5:
                        user = _context.sent;

                        if (user) {
                            _context.next = 8;
                            break;
                        }

                        throw new Error();

                    case 8:
                        req.user = user;
                        req.token = token;
                        next();
                        _context.next = 16;
                        break;

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context['catch'](0);

                        res.status(401).send({ error: "Please authenticate" });

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 13]]);
    }));

    return function auth(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = auth;
//# sourceMappingURL=auth.js.map