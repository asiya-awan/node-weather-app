const request = require('request')

const geocode = (place, callback) => {
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiYXNpYWF3YW4iLCJhIjoiY2p6a2tseXJnMDIwcjNsbjRsbWJhbmtmOSJ9.onfVajF4zLjkrswG2ddCeg&limit=1`;

    request({ url, json: true }, function (error, {body}) {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        }
         else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
         else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode