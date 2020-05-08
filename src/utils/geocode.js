/**
 * GEO coding related
 */
// Dependencies
const request = require('request')
// Container
const lib = {}


lib.mapBoxGetGeo = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamF5Z2VyZXJvMjEiLCJhIjoiY2s5dzZubWF5MDZ2eDNsbWs1bW9zYW85byJ9._I3eZp3zNKkScoqrBtLCSQ`

    request( { url: url, json: true }, (error, {body})=>{
        const {features} = body
        if(!error && features){
            const latitude = features[0].center[0]
            const longtitude = features[0].center[1]
            const location = features[0].place_name
            callback( false, { latitude, longtitude, location}  )
        }else if(!features ){
            callback('Unable to find the location')
        }else{
            callback(error)
        }

    })
}


// Export module
module.exports = lib