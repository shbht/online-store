"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiError = require("../util/apiError");

var _apiError2 = _interopRequireDefault(_apiError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mwErrorHandler(err, req, res, next) {
  if (err) {
    if (err.domain) {
      console.log("Something Bad Happened", err.stack);
      // you should think about gracefully stopping & respawning your server
      // since an unhandled error might put your application into an unknown state
    }

    /* eslint-disable */
    if (err.constructor.name === "UnauthorizedError") {
      console.log("=======Invalid token============>");
      err = new _apiError2.default("Internal Server Error", "Invalid token", "Invalid token", 401);
    }

    /* eslint-enable */
    if (err instanceof _apiError2.default) {
      res.status(err.statusCode).send(err);
    } else if (err instanceof Error) {
      console.log("Internal server error ", err);
      res.status(500).send("Internal Server Error");
    }
  }
  next();
}

exports.default = mwErrorHandler;
//# sourceMappingURL=mwErrorHandler.js.map
