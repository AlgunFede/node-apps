const request = require('request')

const geoCode = (address, callback) => {

    const urlLocation = `http://api.positionstack.com/v1/forward?access_key=1da359a29d86714b7a5d88a5f8cf3e29&query=${address}`
    
    request({url: urlLocation, json: true}, (rej, res) => {

        if (rej) {
            callback('Unable to connect to server', undefined)
        } else if (res.body.data.length === 0) {
            callback('Can\'t find the location', undefined)
        } else {
            callback(undefined, {
                latitude: res.body.data[0].latitude,
                longitude: res.body.data[0].longitude,
                location: res.body.data[0].label
            })
        }

    })
};

module.exports = geoCode;