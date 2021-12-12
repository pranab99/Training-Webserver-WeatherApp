const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=56195ec4945dda87dcc4a2ea779a25bd&query=' + latitude + ',' + longitude + '&units=f'

    request({
        url: url,
        json: true
    }, (error, response) => {
        //    console.log(response.body)
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (response.body.error) {
            callback('Unable to provide location',undefined)
        } else {
            const forecast = response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.'
            callback(undefined, forecast)
        }
    })
}

module.exports = forecast