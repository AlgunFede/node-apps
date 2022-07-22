const request = require('request');

const query = '&query=Montevideo'
const url = `http://api.weatherstack.com/current?access_key=a0b6ed514d5e6d536615d9889e58dff6${query}`

request( {url: url, json: true}, (rej,res) => {

    const temperature = res.body.current.temperature;
    const city = res.body.request.query;

    console.log(`The actual temperature in ${city} is ${temperature} Celsius degrees`)
})

const urlLocation = `http://api.positionstack.com/v1/forward?access_key=1da359a29d86714b7a5d88a5f8cf3e29${query}`
request({url: urlLocation, json: true}, (rej, res) => {

    const latitude = res.body.data[0].latitude;
    const longitude = res.body.data[0].longitude;
    console.log(latitude)
})