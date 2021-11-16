const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=aecc03d88a1e9351c5cdc40590988856&query=' + latitude + ',' + longitude + '&units=m'
    
    request ({url, json: true}, (error, {body}) => {
        if (error) {
                         callback('Unable to connect to weather service!', undefined);
                 } else if (body.error) {
                     callback('Unable to find location', undefined);
                 } else {
                        const temperatura = body.current.temperature;
                           const osecaj = body.current.feelslike;
                      callback(undefined, 'Trenutno je '+ temperatura +
                 ' stepeni, a subjektivni osecaj je kao da je '+ osecaj +' stepeni.');
                 }
    })
}

module.exports = forecast