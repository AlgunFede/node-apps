const request = require('request')


const currWeather = (lat, lon, callback) => {
    

    const latitude = lat.toString();
    const longitude = lon.toString();

    const url = `http://api.weatherstack.com/current?access_key=a0b6ed514d5e6d536615d9889e58dff6&query=${latitude},${longitude}`
    
    request( {url: url, json: true}, (rej,res) => {

        if(rej) {
            callback('Cant connect to the server', undefined)
        } else if(res.body.success === false) {
            callback('Can not find the location', undefined)
        } else {
            callback(undefined, {
                temperature: res.body.current.temperature,
                city: res.body.location.region,
            })
        }
    
    })
}


module.exports = currWeather;