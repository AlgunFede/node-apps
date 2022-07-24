const request = require('request');
const geoCode = require('./utils/geocode') 
const currWeather = require('./utils/currWeather')



geoCode('Montevideo', (error, data) => {
    console.log(error)
    console.log(data)
    console.log(`The precise location for ${data.location} is longitude: ${data.longitude} and latitude: ${data.latitude}`)
    

    
    currWeather(-34.83346, -56.16735, (error, data) => {
        console.log(error);
        console.log(data)
    })  
});
