const request = require('request');

const geocode = (address, callback) => {
    const urlGeo = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaW1wcmFuYWJkYXM5OSIsImEiOiJjazNidDc0YnIwb3U5M2dtcmtubjVyZHV4In0.WsQaNKQyqwpPndX3znqdZg&limit=1"

    request({
        url: urlGeo,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {

            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }


    });

}

module.exports = geocode