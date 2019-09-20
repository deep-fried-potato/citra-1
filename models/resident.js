var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var residentSchema = new Schema({
    name: String,
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
      xcor: Number,
      ycor: Number
    },
    rewardCredits: {
      type: Number,
      default:0
    }
  });
module.exports = mongoose.model('resident',residentSchema)
