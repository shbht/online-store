"use strict";

import express from "express";
import {ProductService} from "./ProductService";

let router = express.Router(),
  {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../../../config/" + nodeEnv)),
  serviceInstance = new ProductService(config),
  productRoute = router.route("/"),
  productParamRoute = router.route("/:id");

productRoute
  .get(serviceInstance.listAll.bind(serviceInstance));

productParamRoute
  .get(serviceInstance.search.bind(serviceInstance));

productRoute
  .post(serviceInstance.insert.bind(serviceInstance));

productParamRoute
  .put(serviceInstance.update.bind(serviceInstance));

productParamRoute
  .delete(serviceInstance.remove.bind(serviceInstance));

export default router;
