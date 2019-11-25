const express = require('express');
const bcrypt = require('bcryptjs');
const axios = require('axios')
var router = express.Router()
const token2id = require("../helpers/token2id")
var residents = require("../models/resident")
var authorities = require("../models/authority")
var issues = require("../models/issue")
var sosalerts = require("../models/sosalert")

router.get("/profile",residentValidate,(req,res)=>{
  residents.findById(req.body.residentId).then((resident)=>{
    let newResident = JSON.parse(JSON.stringify(resident));
    delete newResident.password
    if(resident != null) res.send(newResident);
    else res.status(404).send("Account not found")
  }).catch((err)=>{
    res.status(500).send("db error")
  })
})

router.delete("/deleteProfile",residentValidate,(req,res)=>{
  residents.findByIdAndDelete(req.body.residentId).then((resident)=>{
    res.send("Deleted " + resident.email)
  }).catch((err)=>{
    res.status(500).send("DB error")
  })
})

router.put("/updateProfile",residentValidate,(req, res)=>{
  delete req.body.update.rewardCredits;
  delete req.body.update._emailVerified;
  delete req.body.update._phoneVerified;
  if (req.body.update.password) req.body.update.password = bcrypt.hashSync(req.body.update.password, 8);
  residents.findByIdAndUpdate(req.body.residentId, {$set: req.body.update},{new:true}).then((resident)=>{
    let newResident = JSON.parse(JSON.stringify(resident));
    delete newResident.password
    res.send(newResident)
  }).catch((err)=>{
    res.status(500).send(err)
  })
})

router.post("/addIssue",residentValidate,(req,res)=>{
  axios.get(`https://plus.codes/api?address=${req.body.location.lat},${req.body.location.lng}&email=YOUR_EMAIL_HERE`).then((response)=>{
    requestedIssue = req.body
    requestedIssue.addedBy = req.body.residentId
    requestedIssue.plusCode = response.data.plus_code.global_code
    requestedIssue.addedDate = new Date()
    issues.create(requestedIssue).then((newIssue)=>{
      res.send(newIssue)
    }).catch((err)=>{
      res.status(400).send("Error in request")
    })
  }).catch((err)=>{
    res.status(400).send("Error in request")
  })
})

router.post("/upvoteIssue/:issueId",residentValidate,(req,res)=>{
  issues.findByIdAndUpdate(req.params.issueId,{
    "$addToSet":{upvotes: req.body.residentId}
  },{new:true}).then((issue)=>{
    res.send(issue)
  }).catch((err)=>{
    res.status(500).send(err)
  })
})

router.post("/deleteIssue/:issueId",residentValidate,(req,res)=>{
  issues.findByIdAndDelete(req.params.issueId).then((issue)=>{
    res.send("Deleted")
  }).catch((err)=>{
    res.status(500).send("DB error")
  })
})
router.post("/verifyIssue/:issueId",residentValidate,(req,res)=>{
  newVerification = {
    user:req.body.residentId,
    photo:req.body.photo,
    positive:req.body.positive
  }
  issues.findOneAndUpdate(
    {
      "_id":req.params.issueId,
      "verifications.user":{"$nin":[req.body.residentId]},
      "rewardCredits.amount":{"$gte":1}
    },
    {
      "$push":{verifications:newVerification},
      "$inc":{"rewardCredits.amount":-1}
    },
    {new:true}
  ).then((issue)=>{
    if(issue){
      residents.findByIdAndUpdate(req.body.residentId,{"$inc":{rewardCredits:1}},{new:true}).then((resident)=>{
        res.send(resident)
      }).catch((err)=>{
        console.log(err)
        res.status(500).send("error")
      })
    }
    else res.status(400).send("Bad request")
  }).catch((err)=>{
    console.log(err)
    res.status(500).send("Error")
  })
})

router.get("/getAuthorities",residentValidate,(req,res)=>{
  var rad = parseFloat(req.query.rad)
  var lat = parseFloat(req.query.lat)
  var lng = parseFloat(req.query.lng)
  var upperLat = lat + rad/(111.7) //+- 90 degree latitude overflow dekhle bhai
  var lowerLat = lat - rad/(111.7)
  var rightLng  = lng + rad/(111.321*Math.cos(lat*Math.PI/180)) // +- 180 degree overflow check
  var leftLng  = lng - rad/(111.321*Math.cos(lat*Math.PI/180))
  //SELECT Only requied fields.: id , title, desc ,Type, tags
  authorities.find({"location.lat":{$lt:upperLat,$gt:lowerLat}, "location.lng":{$lt:rightLng,$gt:leftLng}}).then((authorityList)=>{
    res.send(authorityList)
  }).catch((err)=>{
    res.status(400).send("Bad Request")
  })
})

router.post("/SaveMySoul",residentValidate,(req,res)=>{
  sosalerts.create({
    alertType:req.body.alertType,
    location:req.body.location,
    addedBy:req.body.residentId
  }).then((newsosalert)=>{
    //Add Code for Notification/SMS here
    res.send(newsosalert)
  }).catch((err)=>{
    res.status(401).send(err)
  })
})

function residentValidate(req,res,next){
  token2id(req.get("x-access-token")).then((id)=>{
    residents.findById(id).then((resident)=>{
      if (resident._emailVerified){
        req.body.residentId = id;
        next();
      }
      else res.status(403).send("Email not verified")
    })
  }).catch((err)=>{
    res.status(403).send("Token Error")
  })

}

module.exports = router
