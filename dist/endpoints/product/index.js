"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _ProductService = require("./ProductService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(),
    NODE_ENV = process.env.NODE_ENV,
    nodeEnv = NODE_ENV || "local",
    config = Object.freeze(require("../../../config/" + nodeEnv)),
    serviceInstance = new _ProductService.ProductService(config),
    productRoute = router.route("/"),
    productParamRoute = router.route("/:id");


productRoute.get(serviceInstance.listAll.bind(serviceInstance));

productParamRoute.get(serviceInstance.search.bind(serviceInstance));

productRoute.post(serviceInstance.insert.bind(serviceInstance));

productParamRoute.put(serviceInstance.update.bind(serviceInstance));

productParamRoute.delete(serviceInstance.remove.bind(serviceInstance));

exports.default = router;
//# sourceMappingURL=index.js.map
