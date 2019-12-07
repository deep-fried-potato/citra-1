const express = require('express');
var router = express.Router()
const token2id = require("../helpers/token2id")
var residents = require("../models/resident")
var authorities = require("../models/authority")
var issues = require("../models/issue")
var sosalerts = require("../models/sosalert")

router.get("/getIssues",userValidate,(req,res)=>{
  var rad = parseFloat(req.query.rad)
  var lat = parseFloat(req.query.lat)
  var lng = parseFloat(req.query.lng)
  var upperLat = lat + rad/(111.7) //+- 90 degree latitude overflow dekhle bhai
  var lowerLat = lat - rad/(111.7)
  var rightLng  = lng + rad/(111.321*Math.cos(lat*Math.PI/180)) // +- 180 degree overflow check
  var leftLng  = lng - rad/(111.321*Math.cos(lat*Math.PI/180))
  //SELECT Only requied fields.: id , title, desc ,Type, tags
  issues.find({"location.lat":{$lt:upperLat,$gt:lowerLat}, "location.lng":{$lt:rightLng,$gt:leftLng}}).then((issueList)=>{
    res.send(issueList)
  }).catch((err)=>{
    res.status(400).send("Bad Request")
  })
})
router.get("/viewIssue/:issueId",userValidate,(req,res)=>{
  issues.findById(req.params.issueId).populate({path:"addedBy",select:"name"}).populate("residentComments.user","name").populate("authorityComments.user","name").populate("assignedAuthority","name").exec((err,issue)=>{
    if(err){
      res.status(500).send(err)
    }
    else{
      res.send(issue)
    }
  })
})

router.post("/commentIssue/:issueId",userValidate,(req,res)=>{
  var newComment = {
    user:req.body.userId,
    text:req.body.text
  }
  issues.findByIdAndUpdate(req.params.issueId,{
    $push:req.body.isResident?{residentComments:newComment}:{authorityComments:newComment}
  },{new:true}).then((issue)=>{
    res.send(issue)
  }).catch((err)=>{
    res.status(500).send(err)
  })
})

router.get('/viewSOS/:sosId',userValidate,(req,res)=>{
  sosalerts.findById(req.params.sosId).populate("addedBy",'-password').exec((err,sosalert)=>{
    if(err){
      res.status(500).send(err)
    }
    else{
      res.send(sosalert)
    }
  })
})

router.get("/profileById/:userId",userValidate,(req,res)=>{
  residents.findById(req.params.userId,{"name":true, "photo":true}).then((resident)=>{
    if (resident){
      res.send(resident)
    }
    else{
      authorities.findById(req.params.userId,{"password":false}).then((authority)=>{
        if (authority) {
          res.send(authority)
        }
        else res.status(404).send("Account not found")
      }).catch((err)=>{
        res.status(500).send("DB error")
      })
    }
  }).catch((err)=>{
      res.status(500).send("DB error")
  })
})

function userValidate(req,res,next){
  token2id(req.get("x-access-token")).then((id)=>{
    req.body.userId = id;
    residents.findById(id).then((resident)=>{
      if(resident) {
        if (!resident._emailVerified) res.status(403).send("Email not verified")
        req.body.isResident = true;
        next();
      }
      else {
        authorities.findById(id).then((authority)=>{
          if (!authority._emailVerified) res.status(403).send("Email not verified")
        }).catch((err)=>{res.status(500).send(err)})
        req.body.isResident = false;
        next();
      }
    }).catch((err)=>{
      res.status(500).send("DB Error")
    })
  }).catch((err)=>{ res.status(403).send("Token Error") })

}

module.exports = router
