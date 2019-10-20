const request = require('request');

const forecast = ({latitude,longitude,location},callback)=>{
  const url = `https://api.darksky.net/forecast/7bcda7d3f15144b74c7cd301b96dbffe/${latitude},${longitude}`
    request({url:url,json:true},(err,res)=>{
      if(err) callback('unable to connect to weather service!')
      else if(res.body.error){
        callback('unable to find location')
      }
      else {
        callback(undefined,{
          Forecast: res.body.daily.data[0].summary,
          Location:location,
          Temperature :res.body.currently.temperature,
          HighTemperature:res.body.daily.data[0].temperatureHigh,
          LowTemperature:res.body.daily.data[0].temperatureLow,
          PrecipProbability:res.body.currently.precipProbability
        })
      }
     })
  }

  module.exports=forecast;
