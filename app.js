const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
    .options({
        a:{
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


    var encodedAddress = encodeURIComponent(argv.address);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


    axios.get(geocodeUrl).then((response) =>{
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address')
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https:appi.forcast.io/forecast/9eff3c48a48ddd19a8f7ca997c797b22/${lat},${lng}`
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }).then((response) =>{
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`its currently ${temperature}. it feels like ${apparentTemperature}`);

    }).catch((e) =>{
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to API server');
        }else{
            console.log(e.message);
        }
        
    })