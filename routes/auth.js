const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/secret');
var mailer = require('../helpers/mailer')
var residents = require('../models/resident');
var authorities = require('../models/authority')

var router = express.Router()

router.post("/registerResident",(req,res)=>{
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var resident = new residents({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  resident.save((err,newResident)=>{
    if(err) res.status(409).send(err)
    else{
      var token = jwt.sign({ id: newResident._id}, config.secret, {expiresIn: 86400});
      var mailOptions = {
        from: 'citra.app.mailer@gmail.com',
        to: newResident.email,
        subject: 'Email verification',
        text: 'Your verification code is ' + newResident._id
      };
      mailer.sendMail(mailOptions, function(error, info){
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
      });
      res.send([newResident,{"token":token}])
    }
  })
})

router.post("/registerAuthority",(req,res)=>{
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var authority = new authorities({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    registrationNumber:req.body.registrationNumber,
    typeOfAuthority:req.body.typeOfAuthority,
    issuesAddressed:req.body.issuesAddressed,
    location:req.body.location,
  })
  authority.save((err,newAuthority)=>{
    if(err) res.status(409).send(err)
    else{
      var token = jwt.sign({ id: newAuthority._id}, config.secret, {expiresIn: 86400 });
      var mailOptions = {
        from: 'citra.app.mailer@gmail.com',
        to: newAuthority.email,
        subject: 'Email verification',
        text: 'Your verification code is ' + newAuthority._id
      };
      mailer.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send([newAuthority,{"token":token}])
    }
  })
})

router.post("/residentLogin",(req,res)=>{
  residents.findOne({email:req.body.email},(err,resident)=>{
    if(err) res.status(500).send("There has been an error")
    else if(resident == null) res.status(404).send("No account with given credentials exists")
    else{
      if(bcrypt.compareSync(req.body.password,resident.password)){
        var token = jwt.sign({ id: resident._id }, config.secret, { expiresIn: 86400 });
        res.send({"token":token})
      }
      else res.status(403).send("Auth Error")
    }
  })
})

router.post("/authorityLogin",(req,res)=>{
  authorities.findOne({email:req.body.email},(err,authority)=>{
    if(err) res.status(500).send("There has been an error")
    else if(authority == null) res.status(404).send("No account with given credentials exists")
    else{
      if(bcrypt.compareSync(req.body.password,authority.password)){
        var token = jwt.sign({ id: authority._id }, config.secret, { expiresIn: 86400 });
        res.send({"token":token})
      }
      else res.status(403).send("Auth Error")
    }
  })
})

router.get("/verifyResidentEmail/:id",(req,res)=>{
  residents.findByIdAndUpdate(req.params.id,{_emailVerified:true}).then((resident)=>{
    if(resident) res.send("Verified")
    else res.status(404).send("Account Not Found")
  }).catch((err)=>{
    console.log(err)
    res.status(500).send("DB error")
  })
})

router.get("/verifyAuthorityEmail/:id",(req,res)=>{
  authorities.findByIdAndUpdate(req.params.id,{_emailVerified:true}).then((authority)=>{
    if(authority) res.send("Verified")
    else res.status(404).send("Account Not Found")
  }).catch((err)=>{
    console.log(err)
    res.status(500).send("DB error")
  })
})


module.exports = router
