const request = require('request')


const currWeather = (lat, lon, callback) => {
    

    const latitude = lat.toString();
    const longitude = lon.toString();

    const url = `http://api.weatherstack.com/current?access_key=a0b6ed514d5e6d536615d9889e58dff6&query=${latitude},${longitude}`
    
    request( {url: url, json: true}, (rej,{ body }) => {

        if(rej) {
            callback('Cant connect to the server', undefined)
        } else if(body.success === false) {
            callback('Can not find the location', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                city: body.location.region,
            })
        }
    
    })
}


module.exports = currWeather;