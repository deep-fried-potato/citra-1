var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var ObjectId = Schema.Types.ObjectId
  var sosalertSchema = new Schema({
    alertType: {
      type:String,
      required:true
    },
    location:{
      type:{
        lat: Number,
        lng: Number
      },
      required:true
    },
    addedBy:{
      type:ObjectId,
      ref:'resident',
      required:true
    },
  });
module.exports = mongoose.model('sosalert',sosalertSchema)
