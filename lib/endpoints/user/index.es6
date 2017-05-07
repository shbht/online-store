"use strict";

import express from "express";
import logger from "../../util/FocusApiLogger";
import {getConnectionPoolInstance} from "../../mongodb/MongoDbConnectionPool";
import {AvgWaitTimePerPatientService} from "./services/AvgWaitTimePerPatientService";
import {DomainServiceMaster} from "../../reusable/DomainServiceMaster";
import {ServiceResponseHandler} from "../../reusable/ServiceResponseHandler";

let router = express.Router(),
  {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../../../config/" + nodeEnv)),
  dbPoolInstance = getConnectionPoolInstance(config, logger),
  serviceResHandler = new ServiceResponseHandler(),
  domainServiceMaster = new DomainServiceMaster(dbPoolInstance, logger),
  serviceInstance = new AvgWaitTimePerPatientService(dbPoolInstance, domainServiceMaster, serviceResHandler, logger),
  avgWaitTimeRootRoute = router.route("/avgWaitingTimePerPatient");

avgWaitTimeRootRoute
  .get(serviceInstance.calculate.bind(serviceInstance));

export default router;
