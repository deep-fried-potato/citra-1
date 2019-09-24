var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var ObjectId = Schema.Types.ObjectId
  var issueSchema = new Schema({
    title: {
      type:String,
      required:true
    },
    description: {
      type:String,
      required:true
    },
    photo: {
      type:String,
      required:true
    },
    typeOfIssue: {
      type:String,
      required:true
    },
    tags:[{
      type:String
    }],
    plusCode: String,
    location:{
      type:{
        xcor: Number,
        ycor: Number
      },
      required:true
    },
    addedDate:{
      type:Date,
      default: Date.now,
      required:true
    },
    upvotes:[{
      type:ObjectId,
      ref:'resident'
    }],
    assignedAuthority:{
      type:ObjectId,
      ref:'authority'
    },
    residentComments:[{
      user:{
        type:ObjectId,
        ref:'resident'
      },
      text:String
    }],
    authorityComments:[{
      user:{
        type:ObjectId,
        ref:'authority'
      },
      text:String
    }],
    completionStatus:{
      text:String,
      status:Boolean
    },
    addedBy:{
      type:ObjectId,
      ref:'resident',
      required:true
    },
    positiveVerifiers:[{
      type:ObjectId,
      ref:"resident"
    }],
    negativeVerifiers:[{
      type:ObjectId,
      ref:"resident"
    }]
  });
module.exports = mongoose.model('issue',issueSchema)
