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

router.get("/viewIssue/:issueId",authorityValidate,(req,res)=>{
  issues.findById(req.params.issueId).populate("addedBy","name").populate("residentComments.resident","name").populate("authorityComments.authority","name").exec((err,issue)=>{
    if(err){
      res.status(500).send(err)
    }
    else{
      res.send(issue)
    }
  })
})

router.post("/commentIssue/:issueId",authorityValidate,(req,res)=>{
  var newComment = {
    authority:req.body.authorityId,
    text:req.body.text
  }
  issues.findByIdAndUpdate(req.params.issueId,{
    $push:{authorityComments:newComment}
  },{new:true}).then((issue)=>{
    res.send(issue)
  }).catch((err)=>{
    res.status(500).send(err)
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
