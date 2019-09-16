const request = require('request')

const forecast = (latitude, longitude, location, callback) => {
        const url = 'https://api.darksky.net/forecast/d5fb7c8c84d79b8e51fc09e0886145c2/' + latitude + ',' + longitude

    request({ url, json: true }, function (error, {body } )  {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            console.log(`location: ${location} \n summary : ${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out. There is a ${ body.currently.precipProbability} % chance of rain.`)
            callback(undefined,`summary : ${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out. There is a ${ body.currently.precipProbability} % chance of rain.`)
        }
    })
}

module.exports = forecast