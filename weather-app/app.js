const request = require('request');
const geoCode = require('./utils/geocode') 
const currWeather = require('./utils/currWeather')


const location = process.argv[2];

if(!location) {
    console.log('Ups! Not as spected. Please, provide a location!')
} else {
    
    geoCode(location, (error, data) => {
    
        if (error) {
            return console.log(error)
        }
    
        
        currWeather(data.latitude, data.longitude, (error, forecastData) => {
    
            if(error) {
                return console.log(error)
            }
            
            console.log(`The current weather in ${forecastData.city} is ${forecastData.temperature} Celsius degrees`)
        })  
    });
    
}

