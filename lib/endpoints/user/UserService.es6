"use strict";

import {GenericRepository} from "../../generic/GenericRepository";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Q from "q";

export class UserService {

  constructor(config) {
    console.log("inside user service constructor");
    this.dbSerivce = new GenericRepository(config);
  }

  login(req, res) {
    let collection = "user",
      encryptedPassword = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest("hex"),
      query = {
        "body": {
          "userName": req.body.userName,
          "password": encryptedPassword
        }
      },
      secret = req.app.get("tokenSecret");

    console.log("search query ", JSON.stringify(query));

    this.dbSerivce.read({collection, query})
      .then(this.createToken.bind(this, {"userName": req.body.userName}, secret, {}))
      .then(token => {
        res.status(200).send(token);
      })
      .catch(err => {
        console.log("Error ", err);
        throw err;
      });
  }

  createToken(payload, secret, claims) {
    console.log(`$$$ ${UserService.name} createToken() call`);
    let defer = Q.defer();

    jwt.sign(payload, secret, claims, (error, token) => {
      if (!error) {
        console.log("Token Generated");
        defer.resolve(token);
      }else {
        console.log("token not generated", error);
        defer.reject(error);
      }
    });
    return defer.promise;
  }

  createUser(req, res) {
    console.log("inside create user");

    let collection = "user",
      document = {
        "name": req.body.name,
        "userName": req.body.userName,
        "password": req.body.password,
        "createdAt": new Date(),
        "updatedAt": new Date()
      };

    this.dbSerivce.insert({collection, document})
      .then(() => {
        console.log("inserted successfully");
        res.status(200).send("Ok");
      })
      .catch(err => {
        console.log("error ", err);
        throw err;
      });
  }
}
