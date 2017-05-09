"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GenericRepository = require("../../generic/GenericRepository");

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _q = require("q");

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = exports.UserService = function () {
  function UserService(config) {
    _classCallCheck(this, UserService);

    console.log("inside user service constructor");
    this.dbSerivce = new _GenericRepository.GenericRepository(config);
  }

  _createClass(UserService, [{
    key: "login",
    value: function login(req, res) {
      var collection = "user",
          encryptedPassword = _crypto2.default.createHash("md5").update(req.body.password).digest("hex"),
          query = {
        "body": {
          "userName": req.body.userName,
          "password": encryptedPassword
        }
      },
          secret = req.app.get("tokenSecret");

      console.log("search query ", JSON.stringify(query));

      this.dbSerivce.read({ collection: collection, query: query }).then(this.createToken.bind(this, { "userName": req.body.userName }, secret, {})).then(function (token) {
        res.status(200).send(token);
      }).catch(function (err) {
        console.log("Error ", err);
        throw err;
      });
    }
  }, {
    key: "createToken",
    value: function createToken(payload, secret, claims) {
      console.log("$$$ " + UserService.name + " createToken() call");
      var defer = _q2.default.defer();

      _jsonwebtoken2.default.sign(payload, secret, claims, function (error, token) {
        if (!error) {
          console.log("Token Generated");
          defer.resolve(token);
        } else {
          console.log("token not generated", error);
          defer.reject(error);
        }
      });
      return defer.promise;
    }
  }, {
    key: "createUser",
    value: function createUser(req, res) {
      console.log("inside create user");

      var collection = "user",
          document = {
        "name": req.body.name,
        "userName": req.body.userName,
        "password": req.body.password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      };

      this.dbSerivce.insert({ collection: collection, document: document }).then(function () {
        console.log("inserted successfully");
        res.status(200).send("Ok");
      }).catch(function (err) {
        console.log("error ", err);
        throw err;
      });
    }
  }]);

  return UserService;
}();
//# sourceMappingURL=UserService.js.map
