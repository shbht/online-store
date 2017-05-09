"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GenericRepository = require("../../generic/GenericRepository");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductService = exports.ProductService = function () {
  function ProductService(config) {
    _classCallCheck(this, ProductService);

    console.log("inside product constructor");
    this.dbSerivce = new _GenericRepository.GenericRepository(config);
  }

  _createClass(ProductService, [{
    key: "insert",
    value: function insert(req, res) {
      console.log("inside insert");
      var collection = "product",
          document = {
        "name": req.body.name,
        "description": req.body.description,
        "supplier": req.body.supplier,
        "status": req.body.status,
        "createdAt": new Date(),
        "updatedAt": new Date()
      };

      this.dbSerivce.insert({ collection: collection, document: document }).then(function () {
        console.log("inserted successfully");
        res.status(200).send("Ok");
      }).catch(function (err) {
        console.log("error ", err);
        throw err;
      });
    }
  }, {
    key: "remove",
    value: function remove(req, res) {
      var collection = "product",
          query = {
        "body": {
          "_id": req.params.id
        }
      };

      this.dbSerivce.remove({ collection: collection, query: query }).then(function () {
        res.status(200).send();
      }).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: "listAll",
    value: function listAll(req, res) {
      var collection = "product",
          query = {
        "body": {}
      };

      this.dbSerivce.read({ collection: collection, query: query }).then(function (list) {
        res.status(200).send(list);
      }).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: "search",
    value: function search(req, res) {
      var collection = "product",
          query = {
        "body": {
          "_id": req.params.id
        }
      };

      console.log("search query ", JSON.stringify(query));

      this.dbSerivce.read({ collection: collection, query: query }).then(function (product) {
        res.status(200).send(product);
      }).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: "update",
    value: function update(req, res) {
      var collection = "product",
          document = {
        "name": req.body.name,
        "description": req.body.description,
        "supplier": req.body.supplier,
        "status": req.body.status,
        "updatedAt": new Date()
      };

      this.dbSerivce.insert({ collection: collection, document: document }).then(function () {
        res.status(200).send();
      }).catch(function (err) {
        throw err;
      });
    }
  }]);

  return ProductService;
}();
//# sourceMappingURL=ProductService.js.map
