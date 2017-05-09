"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require("method-override");

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _product = require("./endpoints/product");

var _product2 = _interopRequireDefault(_product);

var _user = require("./endpoints/user");

var _user2 = _interopRequireDefault(_user);

var _mwErrorHandler = require("./middleware/mwErrorHandler");

var _mwErrorHandler2 = _interopRequireDefault(_mwErrorHandler);

var _expressJwt = require("express-jwt");

var _expressJwt2 = _interopRequireDefault(_expressJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NODE_ENV = process.env.NODE_ENV,
    nodeEnv = NODE_ENV || "local",
    config = Object.freeze(require("../config/" + nodeEnv)),
    app = (0, _express2.default)(),
    authSecretKey = config.authSecretKey;


app.set("tokenSecret", authSecretKey);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ "extended": true }));

app.use((0, _expressJwt2.default)({ "secret": authSecretKey }).unless({
  "path": ["/user", "/user/login", "/healthcheck"]
}));

app.use("/healthcheck", function (req, res) {
  res.status(200).send("OK");
});

app.use("/user", _user2.default);
app.use("/product", _product2.default);

app.use(_methodOverride2.default);
app.use(_mwErrorHandler2.default);

app.listen(3000, function () {
  console.log("Server has started at datetime " + new Date() + " and is listening on port: 3000");
});

module.exports = app;
//# sourceMappingURL=api.js.map
