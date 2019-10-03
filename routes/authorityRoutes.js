const express = require('express');
var router = express.Router()
const token2id = require("../helpers/token2id")
var authorities = require("../models/authority")
var residents = require("../models/resident")
var issues = require("../models/issue")

router.get("/profile",authorityValidate,(req,res)=>{
  authorities.findById(req.body.authorityId).then((authority)=>{
    if(authority != null) res.send(authority);
    else res.status(404).send("Account not found")
  }).catch((err)=>{
    res.status(500).send("db error")
  })
})

router.post("/claimIssue/:issueId",authorityValidate,(req,res)=>{
  issues.findByIdAndUpdate(req.params.issueId,{$set:{assignedAuthority:req.body.authorityId}},{new:true}).then((updatedIssue)=>{
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

function authorityValidate(req,res,next){
  token2id(req.get("x-access-token")).then((id)=>{
    req.body.authorityId = id;
    next();
  }).catch((err)=>{
    res.status(403).send("Token Error")
  })

}
module.exports = router
