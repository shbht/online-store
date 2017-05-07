"use strict";

import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import product from "./endpoints/product"

let {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../config/" + nodeEnv)),
  app = express(),
  environmentVariables = require("../config/environmentVariables");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/product", product);

app.use(methodOverride);

app.listen(3000, () => {
  console.log(`Server has started at datetime ${new Date()} and is listening on port: 3000`);
});
