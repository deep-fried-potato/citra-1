var residents = require("../models/resident")
var authorities = require("../models/authority")

module.exports = function(location){
  return new Promise((resolve, reject)=>{
    var rad = 5
    var lat = location.lat
    var lng = location.lng
    var upperLat = lat + rad/(111.7) //+- 90 degree latitude overflow dekhle bhai
    var lowerLat = lat - rad/(111.7)
    var rightLng  = lng + rad/(111.321*Math.cos(lat*Math.PI/180)) // +- 180 degree overflow check
    var leftLng  = lng - rad/(111.321*Math.cos(lat*Math.PI/180))
    authorities.find({"location.lat":{$lt:upperLat,$gt:lowerLat}, "location.lng":{$lt:rightLng,$gt:leftLng}},{"phone":true}).then((authorityList)=>{
      residents.find({"location.lat":{$lt:upperLat,$gt:lowerLat}, "location.lng":{$lt:rightLng,$gt:leftLng}},{"phone":true}).then((residentList)=>{
        var phoneList1 = authorityList.map(a => a.phone);
        var phoneList2 = residentList.map(a => a.phone);
        resolve(phoneList1.concat(phoneList2));
      }).catch((err)=>{
        reject(err)
      })
    }).catch((err)=>{
      reject(err)
    })
  })
}
