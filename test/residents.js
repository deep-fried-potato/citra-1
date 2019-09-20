var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index')
var token = ""
chai.use(chaiHttp);
chai.should();
describe("residents", () => {
  describe("POST /auth/residentLogin",()=>{
    it("Should login to the account",(done)=>{
      loginCreds={"email":"sri.sailesh.m@gmail.com","password":"royya123"}
      chai.request(app)
        .post('/auth/residentLogin')
        .send(loginCreds)
        .end((err,res)=>{
          res.should.have.status(200)
          token = res.body.token
          done();
        })
    })
  })
  describe("GET /resident/profile",()=>{
    it("Should get profile details",(done)=>{
      chai.request(app)
        .get('/resident/profile')
        .set('x-access-token',token)
        .end((err,res)=>{
          res.should.have.status(200)
          res.body.should.be.a('object')
          done();
        })
    })
  })
});
