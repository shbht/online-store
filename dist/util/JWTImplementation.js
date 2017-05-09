"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _q = require("q");

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JWTImplementaion = function () {
  function JWTImplementaion(secretKey) {
    _classCallCheck(this, JWTImplementaion);

    this.secretKey = secretKey;
  }

  _createClass(JWTImplementaion, [{
    key: "sign",
    value: function sign(payload, options) {

      var token = _jsonwebtoken2.default.sign(payload, this.secretKey, options);

      return token;
    }
  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      return _q2.default.ninvoke(_jsonwebtoken2.default, "verify", token, this.secretKey);
    }
  }]);

  return JWTImplementaion;
}();

exports.default = JWTImplementaion;
//# sourceMappingURL=JWTImplementation.js.map
