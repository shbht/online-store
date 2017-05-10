"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodb = require("mongodb");

var _q = require("q");

var _q2 = _interopRequireDefault(_q);

var _nodeUuid = require("node-uuid");

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenericRepository = exports.GenericRepository = function () {
  function GenericRepository(config) {
    _classCallCheck(this, GenericRepository);

    if (!config || !config.mongoDb.connectionString) {
      throw new Error("MongoDB connection string not available");
    }

    this.connectionString_ = config.mongoDb.connectionString;

    this.dbConnection_ = this.connectToDB();
  }

  /**
   * Create connection to the mongodb database.
   * @private
   * @returns {Q.Promise} A promise which resolves the connection to the mongodb client.
   */


  _createClass(GenericRepository, [{
    key: "connectToDB",
    value: function connectToDB() {
      this.dbConnection_ = _q2.default.ninvoke(_mongodb.MongoClient, "connect", this.connectionString_);
      return this.dbConnection_;
    }

    /**
     * function for creating the mongodb object.
     * @returns {object} mongodb object after creating the connection.
     */

  }, {
    key: "getMongoDBObject",
    value: function getMongoDBObject() {
      var _this = this;

      return this.dbConnection_.catch(function () {
        return _this.connectToDB();
      }).then(function (dbConn) {
        return dbConn;
      });
    }

    /**
     *@param {object} query read query
     *@returns {object} returns promise for read query
     */

  }, {
    key: "readQuery",
    value: function readQuery(query) {

      return {
        "fields": query.fields || {},
        "limit": query.limit || 0,
        "skip": query.skip || 0,
        "sort": query.sort || {}
      };
    }

    /**
     *@param {string} collection collection to be used for query
     *@param {object} query query object which contains body(filter query), fields, limit, skip, sort fields
     *@returns {Q.Promise} returns promise for read query
     */

  }, {
    key: "read",
    value: function read(_ref) {
      var collection = _ref.collection,
          query = _ref.query;


      var options = [];

      options.push(query.body);
      options.push(this.readQuery(query));

      return this.getMongoDBObject().then(function (db) {
        return _q2.default.npost(db.collection(collection), "find", options).then(function (cursor) {
          return _q2.default.ninvoke(cursor, "toArray").then(function (results) {
            return results;
          });
        });
      });
    }

    /**
     *
     * @param {string} collection name.
     * @param {object} object to be inserted into the collections
     * @returns {Q.Promise} returns promise for insertion
     */

  }, {
    key: "insert",
    value: function insert(_ref2) {
      var collection = _ref2.collection,
          document = _ref2.document;

      document._id = _nodeUuid2.default.v1();

      return this.getMongoDBObject().then(function (db) {
        return _q2.default.ninvoke(db.collection(collection), "insert", document);
      });
    }

    /**
     *@param {string} collection collection to be used for query
     *@param {object} query query object which contains filter query
     *@returns {Q.Promise} returns promise
     */

  }, {
    key: "remove",
    value: function remove(_ref3) {
      var collection = _ref3.collection,
          query = _ref3.query;


      return this.getMongoDBObject().then(function (db) {
        return _q2.default.ninvoke(db.collection(collection), "remove", query);
      });
    }

    /**
     *@param {string} collection collection to be used for query
     *@param {object} query query object which contains filter query
     *@param {object} document the fields/vals to be updated
     *@returns {Q.Promise} returns promise
     */

  }, {
    key: "update",
    value: function update(_ref4) {
      var collection = _ref4.collection,
          query = _ref4.query,
          document = _ref4.document;


      return this.getMongoDBObject().then(function (db) {
        return _q2.default.ninvoke(db.collection(collection), "update", query, document);
      });
    }
  }]);

  return GenericRepository;
}();
//# sourceMappingURL=GenericRepository.js.map
