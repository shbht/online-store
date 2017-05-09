process.env.NODE_ENV = "test";

var chai = require('chai'),
  chaiHttp = require('chai-http'),
  api = require('../dist/api'),
  should = chai.should();

chai.use(chaiHttp);

describe('Product', function() {
  /*
   * Test the /GET route
   */
  describe('/GET product', function() {
    it('it should GET all the products', function(done) {
      chai.request(api)
        .get('/product')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
