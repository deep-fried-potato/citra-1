const express = require('express');
const axios = require('axios')
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
  axios.get(`https://plus.codes/api?address=${req.body.location.lat},${req.body.location.lng}&email=YOUR_EMAIL_HERE`).then((response)=>{
    issues.create({
      title:req.body.title,
      description:req.body.description,
      photo:req.body.photo,
      typeOfIssue:req.body.typeOfIssue,
      location:req.body.location,
      plusCode:response.data.plus_code.global_code,
      addedDate: new Date(),
      addedBy:req.body.residentId
    }).then((newIssue)=>{
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
    else{
      res.status(400).send("Bad request")
    }
  }).catch((err)=>{
    console.log(err)
    res.status(500).send("Error")
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
