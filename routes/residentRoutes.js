const express = require('express');
var router = express.Router()
const token2id = require("../helpers/token2id")
var residents = require("../models/resident")
var authorities = require("../models/authority")
var issues = require("../models/issue")

router.get("/profile",residentValidate,(req,res)=>{
  residents.findById(req.body.residentId).then((resident)=>{
    if(resident != null) res.send(resident);
    else res.status(404).send("Account not found")
  }).catch((err)=>{
    res.status(500).send("db error")
  })
})

router.post("/deleteProfile",residentValidate,(req,res)=>{
  residents.findByIdAndDelete(req.body.residentId).then((resident)=>{
    res.send("Deleted")
  }).catch((err)=>{
    res.status(500).send("DB error")
  })
})

router.post("/addIssue",residentValidate,(req,res)=>{
  issues.create({
    title:req.body.title,
    description:req.body.description,
    photo:req.body.photo,
    typeOfIssue:req.body.typeOfIssue,
    location:req.body.location,
    addedDate: new Date(),
    addedBy:req.body.residentId
  }).then((newIssue)=>{
    res.send(newIssue)
  }).catch((err)=>{
    res.status(500).send(err)
  })
})


function residentValidate(req,res,next){
  token2id(req.get("x-access-token")).then((id)=>{
    req.body.residentId = id;
    next();
  }).catch((err)=>{
    res.status(403).send("Token Error")
  })

}

module.exports = router
