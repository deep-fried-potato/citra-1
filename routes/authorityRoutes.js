const express = require('express');
var request= require('request');
var router = express.Router()
const token2id = require("../helpers/token2id")
const paymentValidator = require("../helpers/paymentValidator")
var authorities = require("../models/authority")
var residents = require("../models/resident")
var issues = require("../models/issue")

router.get("/profile",authorityValidate,(req,res)=>{
  authorities.findById(req.body.authorityId).then((authority)=>{
    let newAuthority = JSON.parse(JSON.stringify(authority));
    delete newAuthority.password
    if(authority) res.send(newAuthority);
    else res.status(404).send("Account not found")
  }).catch((err)=>{
    res.status(500).send("db error")
  })
})

router.post("/claimIssue/:issueId",authorityValidate,(req,res)=>{
  issues.findOneAndUpdate({_id:req.params.issueId,assignedAuthority:null},{$set:{assignedAuthority:req.body.authorityId}},{new:true}).then((updatedIssue)=>{
    res.send(updatedIssue)
  }).catch((err)=>{
    res.status(400).send("bad request")
  })
})
router.post("/unclaimIssue/:issueId",authorityValidate,(req,res)=>{
  issues.findOneAndUpdate({_id:req.params.issueId,assignedAuthority:req.body.authorityId},{$set:{assignedAuthority:null}},{new:true}).then((updatedIssue)=>{
    res.send(updatedIssue)
  }).catch((err)=>{
    res.status(400).send("bad request")
  })
})
router.post("/updateStatus/:issueId",authorityValidate,(req,res)=>{
  var newStatus = {
    text:req.body.text,
    status:req.body.status,
    timestamp:Date.now()
  }
  issues.findOneAndUpdate({_id:req.params.issueId,assignedAuthority:req.body.authorityId},{$push:{completionStatus:newStatus}},{new:true}).then((updatedIssue)=>{
    res.send(updatedIssue)
  }).catch((err)=>{
    res.status(400).send("Bad Request")
  })
})
router.post("/addReward/:issueId",authorityValidate,(req,res)=>{
  authorities.findById(req.body.authorityId).then((authority)=>{
    var headers = { 'X-Api-Key': 'test_9506a69f44e1feb678d6275bc97', 'X-Auth-Token': 'test_00efe9868932c51b6ca50f8e7e3'}
    var payload = {
      purpose: req.params.issueId,
      amount: req.body.amount,
      phone: '9999999999',
      buyer_name: authority.name,
      redirect_url: 'http://www.example.com/redirect/',
      send_email: true,
      webhook: 'http://139.59.75.22:3000/authority/confirmPayment',
      send_sms: false,
      email: authority.email,
      allow_repeated_payments: false}

    request.post('https://test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
      if(!error && response.statusCode == 201) res.send(body);
    })
  }).catch((err)=>{
    console.log(err)
    res.status(500).send("db error")
  })
})

router.post("/confirmPayment",(req,res)=>{
  if(paymentValidator(req.body)){
    issues.findByIdAndUpdate(req.body.purpose,{rewardCredits:{amount:parseFloat(req.body.amount),paymentId:req.body.payment_id}}).then((update)=>{
        res.send({})
    }).catch((err)=>{
      console.log(err)
      res.status(500).send()
    })
  }
  else res.status(403).send()
})

function authorityValidate(req,res,next){
  token2id(req.get("x-access-token")).then((id)=>{
    authorities.findById(id).then((authority)=>{
      if (authority._emailVerified){
        req.body.authorityId = id;
        next();
      }
      else res.status(403).send("Email not verified")
    })
  }).catch((err)=>{
    res.status(403).send("Token Error")
  })

}
module.exports = router
