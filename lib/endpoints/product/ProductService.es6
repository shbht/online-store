"use strict";

import {GenericRepository} from "../../generic/GenericRepository";

export class ProductService {

  constructor(config) {
    console.log("inside product constructor");
    this.dbSerivce = new GenericRepository(config);
  }

  insert(req, res) {
    console.log("inside insert");
    let collection = "product",
      document = {
        "name": req.body.name,
        "description": req.body.description,
        "supplier": req.body.supplier,
        "status": req.body.status,
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

  remove(req, res) {
    let collection = "product",
      query = {
        "body": {
          "_id": req.params.id
        }
      };

    this.dbSerivce.remove({collection, query})
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        throw err;
      });
  }

  listAll(req, res) {
    let collection = "product",
      query = {
        "body": {}
      };

    this.dbSerivce.read({collection, query})
      .then(list => {
        res.status(200).send(list);
      })
      .catch(err => {
        throw err;
      });
  }

  search(req, res) {
    let collection = "product",
      query = {
        "body": {
          "_id": req.params.id
        }
      };

    console.log("search query ", JSON.stringify(query));

    this.dbSerivce.read({collection, query})
      .then(product => {
        res.status(200).send(product);
      })
      .catch(err => {
        throw err;
      });
  }

  update(req, res) {
    let collection = "product",
      query = {
        "_id": req.params.id
      },
      document = {
        "$set": {"status": req.body.status,
          "updatedAt": new Date()
        }
      };

    this.dbSerivce.update({collection, query, document})
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        throw err;
      });
  }
}
