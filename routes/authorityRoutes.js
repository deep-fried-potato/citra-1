const express = require('express');
var router = express.Router()

router.post("/signup",(req,res)=>{
  res.send(req.body)
})

module.exports = router
