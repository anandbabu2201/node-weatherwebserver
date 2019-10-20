const request = require('request');

const geocode =(address,callback)=>{
  const geoUrl= `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5hbmRiYWJ1MjIwMSIsImEiOiJjazB2N2VqNjMwdGZ6M2RwNW9kYzkxcDdlIn0.CGABIACqnPvQ17NKgY4PEQ`
  request({url:geoUrl,json:true},(err,res)=>
  {
    if(err) callback('unable to connect to geocode service!',undefined)
    else if(res.body.features.length ===0){
      callback('unable to find location. Try another search',undefined)
    }
    else {
    callback(undefined,{
      latitude:res.body.features[0].center[1],
      longitude : res.body.features[0].center[0],
      location :res.body.features[0].place_name})
    }
  })
}

module.exports=geocode
