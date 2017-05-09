"use strict";

import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import product from "./endpoints/product";
import user from "./endpoints/user";
import mwErrorHandler from "./middleware/mwErrorHandler";
import expressJwt from "express-jwt";

let {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../config/" + nodeEnv)),
  app = express(),
  {authSecretKey} = config;

app.set("tokenSecret", authSecretKey);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.use(expressJwt({"secret": authSecretKey}).unless(
  {
    "path": [
      "/user",
      "/user/login",
      "/healthcheck"
    ]
  }
));

app.use("/healthcheck", (req, res) => {
  res.status(200).send("OK");
});

app.use("/user", user);
app.use("/product", product);

app.use(methodOverride);
app.use(mwErrorHandler);

app.listen(3000, () => {
  console.log(`Server has started at datetime ${new Date()} and is listening on port: 3000`);
});

module.exports = app;
