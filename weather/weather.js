const request = require('request');

var getWeather = (lat, lng, callback) =>{
    request({
        url: `https:appi.forcast.io/forecast/9eff3c48a48ddd19a8f7ca997c797b22/${lat},${lng}`,
        json: true
    }, (error, response, body) =>{
        if(error){
            callback("unable to connect to forecast.io server");
        }else if(response.statusCode === 4000){
            callback('Unable to fetch weather');
        }else if(response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        }
    })

}

module.exports.getWeather = getWeather;
