"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _UserService = require("./UserService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(),
    NODE_ENV = process.env.NODE_ENV,
    nodeEnv = NODE_ENV || "local",
    config = Object.freeze(require("../../../config/" + nodeEnv)),
    serviceInstance = new _UserService.UserService(config),
    userRoute = router.route("/"),
    loginRoute = router.route("/login");


userRoute.post(serviceInstance.createUser.bind(serviceInstance));

loginRoute.post(serviceInstance.login.bind(serviceInstance));

exports.default = router;
//# sourceMappingURL=index.js.map
