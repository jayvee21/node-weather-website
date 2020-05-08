/**
 * Forecast related
 */
// dependencies
const request = require('request')


// Module container
const forecast = {}


forecast.get = ( lat, long, callback ) =>{
    const url = `http://api.weatherstack.com/current?access_key=b6498191ee22343f29ac3b9bb9efce73&query=${lat},${long}&units=f`
    request( {url: url, json: true}, ( err, {body:weatherJson} )=> {
        const { current } = weatherJson
        if(!err && weatherJson){
            callback(false, {'description': current.weather_descriptions[0],  
                             'temperature': current.temperature,
                             'feelslike':  current.feelslike })
        }else if( error ){
            callback('Invalid request, unable to find location.')
        }else{
            callback('Unable to connect to weather service')
        }
    })
}

// Export the module
module.exports = forecast