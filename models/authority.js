var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var authoritySchema = new Schema({
    name: String,
    registrationNumber : {
      type:String,
      unique:true
    },
    _regnVerified:{
      type:Boolean,
      default:false
    },
    email: {
      type:String,
      required: true,
      unique: true
    },
    _emailVerified : {
      type: Boolean,
      default: false
    },
    password: String,
    phone: Number,
    _phoneVerified : {
      type: Boolean,
      default: false
    },
    photo: String,
    plusCode: String,
    location:{
      lat: Number,
      lng: Number
    },
    typeOfAuthority:{
      type:String
    },
    issuesAddressed:{
      type:[String],
      default:[]
    },
    address:{
      line1:String,
      line2:String,
      city:String,
      state:String,
      pincode:Number
    }
  });
module.exports = mongoose.model('authority',authoritySchema)
