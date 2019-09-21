var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index')
var token = ""
var id = ""
chai.use(chaiHttp);
chai.should();
describe("residents", () => {
  describe("POST /auth/registerResident",()=>{
    it("Should create new test acc",(done)=>{
      loginCreds={"email":"test@test.com","password":"royya123"}
      chai.request(app)
        .post('/auth/registerResident')
        .send(loginCreds)
        .end((err,res)=>{
          res.should.have.status(200)
          id = res.body[0]._id
          done();
        })
    })
  })
  describe("GET /auth/verifyResidentEmail",()=>{
    it("Should verifyResidentEmail",(done)=>{
      chai.request(app)
        .get('/auth/verifyResidentEmail/'+id)
        .end((err,res)=>{
          res.should.have.status(200)
          done();
        })
    })
  })
  describe("POST /auth/residentLogin",()=>{
    it("Should login to the account",(done)=>{
      loginCreds={"email":"test@test.com","password":"royya123"}
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
  describe("POST /resident/deleteProfile",()=>{
    it("Should delete test profile ",(done)=>{
      chai.request(app)
        .post('/resident/deleteProfile')
        .set('x-access-token',token)
        .end((err,res)=>{
          res.should.have.status(200)
          done();
        })
    })
  })
});
