process.env.NODE_ENV = "test";

var chai = require('chai'),
  chaiHttp = require('chai-http'),
  express = require('express'),
  api = require('../dist/api'),
  should = chai.should(),
  app = express();

chai.use(chaiHttp);

describe('Product', function() {

  /*
   * Test the /GET route
   */
  describe('/GET product', function() {
    it('it should GET all the products', function(done) {
      chai.request(api)
        .get('/product')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYmh0IiwiaWF0IjoxNDk0MzIyODQ3fQ.IVT9f0zEXqqBqSlnWhoVbOLlbjj20lo56qdPM-1m6QE')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
