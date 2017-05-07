"use strict";

import express from "express";
import {ProductService} from "./ProductService";

let router = express.Router(),
  {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../../../config/" + nodeEnv)),
  serviceInstance = new ProductService(),
  productRoute = router.route("/product");

productRoute
  .get(serviceInstance.search.bind(serviceInstance));

productRoute
  .post(serviceInstance.insert.bind(serviceInstance));

productRoute
  .put(serviceInstance.update.bind(serviceInstance));

productRoute
  .delete(serviceInstance.remove.bind(serviceInstance));

export default router;
