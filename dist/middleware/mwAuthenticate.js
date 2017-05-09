"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _JWTImplementaion = require("../util/JWTImplementaion");

var _JWTImplementaion2 = _interopRequireDefault(_JWTImplementaion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mwAuthenticate(req, res, next) {
  var NODE_ENV = process.env.NODE_ENV,
      nodeEnv = NODE_ENV || "local",
      config = Object.freeze(require("../../config/" + nodeEnv)),
      secret = req.app.get("secretKey"),
      jwtInstance = new _JWTImplementaion2.default(secret),
      tokenRegex = new RegExp("^(b|B)earer\\s"),
      token = req.header("Authorization");


  if (!config.authorization.authorize) {
    console.log("Authentication is disabled by confguration");

    return next(new Error(req.id, "Forbidden", "Server understood the request " + "but is refusing to fulfill it", "", 403));
  }

  if (!token || !tokenRegex.test(token)) {
    console.log("Authentication credentials were missing or incorrect");
    var err = new Error(req.id, "Unauthorized", "Authentication credentials missing or incorrect", 401);

    return next(err);
  }

  token = token.split(" ")[1];

  console.log("token ==> ", token);

  jwtInstance.verifyToken(token).then(function (data) {
    if (data.iss !== "node-bridge") {
      console.log("Authentication credentials are incorrect. Issuer cannot be verified.");
      var _err = new Error(req.id, "Unauthorized", "Authentication credentials missing or incorrect", 401);

      return next(_err);
    }

    console.log("Authentication Token verification done successfully", data);
    req.user = data;
    console.log("Authentication Token added", req.user);
    return next();
  }, function (failure) {
    console.log("Unable to verify the supplied token", failure);
    return next(new Error(req.id, "Bad Request", "Token Verification Failed", "", 400));
  });
}

exports.default = mwAuthenticate;
//# sourceMappingURL=mwAuthenticate.js.map
