const request = require('request');
const geoCode = require('./utils/geocode') 
const currWeather = require('./utils/currWeather')


const location = process.argv[2];

if(!location) {
    console.log('Ups! Not as spected. Please, provide a location!')
} else {
    
    geoCode(location, (error, { latitude, longitude } = {}) => {
    
        if (error) {
            return console.log(error)
        }

        currWeather(latitude, longitude, (error, { city, temperature }) => {
    
            if(error) {
                return console.log(error)
            }
            
            console.log(`The current weather in ${city} is ${temperature} Celsius degrees`)
        })  
    });
    
}

