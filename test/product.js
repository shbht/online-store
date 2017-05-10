process.env.NODE_ENV = "test";

var chai = require('chai'),
  chaiHttp = require('chai-http'),
  express = require('express'),
  api = require('../dist/api'),
  should = chai.should(),
  Q = require("q"),
  mongodb = require("mongodb"),
  token = '';

chai.use(chaiHttp);

describe('Product', function() {

  before(function (done) {
    Q.ninvoke(mongodb.MongoClient, "connect", "mongodb://127.0.0.1:27017/store_test")
      .then(function(db) {
        db.collection("product").remove({});
        db.collection("user").remove({});

        chai.request(api)
          .post('/user')
          .send({
            "name": "Shobhit Khandelwal",
            "userName": "shobhit",
            "password": "123456"
          })
          .end(function (err, res) {
            chai.request(api)
              .post('/user/login')
              .send({
                "userName": "shobhit",
                "password": "123456"
              })
              .end(function (err, res) {
                token = "Bearer " + res.text;
                done();
              });
          });
      })
      .catch(function (err) {
        console.log("err");
        done();
      })
  });

  /*
   * Test the /GET route
   */
  describe('/GET product', function() {
    it('it should GET all the products', function(done) {
      chai.request(api)
        .get('/product')
        .set('Authorization', token)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/post product', function() {
    it('it should post new product', function (done) {
      chai.request(api)
        .post('/product')
        .set('Authorization', token)
        .send({
          "name": "mobile",
          "description": "G3",
          "supplier": "motorola",
          "status": "active"
        })
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET product', function() {
    it('it should GET all the products', function(done) {
      chai.request(api)
        .get('/product')
        .set('Authorization', token)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  describe('/put product', function() {

    it('it should update product status', function (done) {

      chai.request(api)
        .get('/product')
        .set('Authorization', token)
        .end(function (err, res) {
          var id = res.body[0]._id;

          chai.request(api)
            .put('/product/' + id)
            .set('Authorization', token)
            .send({
              "status": "inactive"
            })
            .end(function (err, res) {
              res.should.have.status(200);
              done();
            });
        });
    });
  });

  describe('/remove product', function() {

    it('it should remove product', function (done) {

      chai.request(api)
        .get('/product')
        .set('Authorization', token)
        .end(function (err, res) {
          var id = res.body[0]._id;

          chai.request(api)
            .delete('/product/' + id)
            .set('Authorization', token)
            .end(function (err, res) {
              done();
            });
        });
    });
  });
});
