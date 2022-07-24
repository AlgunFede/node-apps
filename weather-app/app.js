const request = require('request');
const geoCode = require('./utils/geocode') 
const currWeather = require('./utils/currWeather')


// const query = '&query=Montevideo'
// const url = `http://api.weatherstack.com/current?access_key=a0b6ed514d5e6d536615d9889e58dff6${query}`

// request( {url: url, json: true}, (rej,res) => {

//     const temperature = res.body.current.temperature;
//     const city = res.body.request.query;

//     console.log(`The actual temperature in ${city} is ${temperature} Celsius degrees`)
// })



geoCode('Montevideo', (error, data) => {
    console.log(error)
    console.log(data)
    console.log(`The precise location for ${data.location} is longitude: ${data.longitude} and latitude: ${data.latitude}`)
});

currWeather(-34.83346, 0, (error, data) => {
    console.log(error);
    console.log(data)
    console.log(`The current temperature in ${data.city} is ${data.temperature} celsius degrees`)
})  