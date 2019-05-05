'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var User = require('../models/user');
var Auth = require('../middleware/auth');
var router = new express.Router();

router.post('/users', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var user, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user = new User(req.body);
                        _context.prev = 1;
                        _context.next = 4;
                        return user.generateJWT();

                    case 4:
                        token = _context.sent;
                        _context.next = 7;
                        return user.setIp(req);

                    case 7:
                        _context.next = 9;
                        return user.save();

                    case 9:
                        res.status(201).send({ user: user, token: token });

                        _context.next = 16;
                        break;

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context['catch'](1);

                        console.log(_context.t0);
                        res.status(400).send(_context.t0);

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 12]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

router.post('/users/login', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var user, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return User.findByCredentials(req.body.email, req.body.password);

                    case 3:
                        user = _context2.sent;
                        _context2.next = 6;
                        return user.generateJWT();

                    case 6:
                        token = _context2.sent;

                        res.send({ user: user, token: token });
                        _context2.next = 14;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](0);

                        console.log(_context2.t0);
                        res.status(400).send();

                    case 14:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 10]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());
router.post('/users/logout', Auth, function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;

                        req.user.tokens = req.user.tokens.filter(function (token) {
                            return token.token !== req.token;
                        });
                        _context3.next = 4;
                        return req.user.save();

                    case 4:
                        res.send();
                        _context3.next = 10;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](0);

                        res.status(500).send();

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 7]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());
router.post('/users/logoutAll', Auth, function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;

                        req.user.tokens = [];
                        _context4.next = 4;
                        return req.user.save();

                    case 4:
                        res.send();
                        _context4.next = 10;
                        break;

                    case 7:
                        _context4.prev = 7;
                        _context4.t0 = _context4['catch'](0);

                        res.status(500).send();

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 7]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

router.get('/users', Auth, function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var users;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return User.find({});

                    case 3:
                        users = _context5.sent;

                        res.send(users);
                        _context5.next = 10;
                        break;

                    case 7:
                        _context5.prev = 7;
                        _context5.t0 = _context5['catch'](0);

                        res.status(500).send();

                    case 10:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 7]]);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}());
router.get('/users/me', Auth, function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        try {
                            res.send(req.user);
                        } catch (e) {
                            res.status(500).send();
                        }

                    case 1:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}());

router.get('/users/:id', Auth, function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var _id, user;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _id = req.params.id;
                        _context7.prev = 1;
                        _context7.next = 4;
                        return User.findById(_id);

                    case 4:
                        user = _context7.sent;

                        if (user) {
                            _context7.next = 7;
                            break;
                        }

                        return _context7.abrupt('return', res.status(404).send());

                    case 7:

                        res.send(user);
                        _context7.next = 13;
                        break;

                    case 10:
                        _context7.prev = 10;
                        _context7.t0 = _context7['catch'](1);

                        res.status(500).send();

                    case 13:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[1, 10]]);
    }));

    return function (_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}());

router.patch('/users/:id', Auth, function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var updates, allowedUpdates, isValidOperation, user;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        updates = Object.keys(req.body);
                        allowedUpdates = ['name', 'email', 'password', 'age'];
                        isValidOperation = updates.every(function (update) {
                            return allowedUpdates.includes(update);
                        });

                        if (isValidOperation) {
                            _context8.next = 5;
                            break;
                        }

                        return _context8.abrupt('return', res.status(400).send({ error: 'Invalid updates!' }));

                    case 5:
                        _context8.prev = 5;
                        _context8.next = 8;
                        return User.findById(req.params.id);

                    case 8:
                        user = _context8.sent;

                        updates.forEach(function (update) {
                            return user[update] = req.body[update];
                        });
                        _context8.next = 12;
                        return user.save();

                    case 12:
                        if (user) {
                            _context8.next = 14;
                            break;
                        }

                        return _context8.abrupt('return', res.status(404).send());

                    case 14:

                        res.send(user);
                        _context8.next = 20;
                        break;

                    case 17:
                        _context8.prev = 17;
                        _context8.t0 = _context8['catch'](5);

                        res.status(400).send(_context8.t0);

                    case 20:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[5, 17]]);
    }));

    return function (_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
}());

router.delete('/users/:id', Auth, function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var user;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.prev = 0;
                        _context9.next = 3;
                        return User.findByIdAndDelete(req.params.id);

                    case 3:
                        user = _context9.sent;

                        if (user) {
                            _context9.next = 6;
                            break;
                        }

                        return _context9.abrupt('return', res.status(404).send());

                    case 6:

                        res.send(user);
                        _context9.next = 12;
                        break;

                    case 9:
                        _context9.prev = 9;
                        _context9.t0 = _context9['catch'](0);

                        res.status(500).send();

                    case 12:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, undefined, [[0, 9]]);
    }));

    return function (_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
}());

module.exports = router;
//# sourceMappingURL=user.js.map