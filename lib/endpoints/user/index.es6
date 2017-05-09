"use strict";

import express from "express";
import {UserService} from "./UserService";

let router = express.Router(),
  {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../../../config/" + nodeEnv)),
  serviceInstance = new UserService(config),
  userRoute = router.route("/"),
  loginRoute = router.route("/login");

userRoute
  .post(serviceInstance.createUser.bind(serviceInstance));

loginRoute
  .post(serviceInstance.login.bind(serviceInstance));

export default router;
