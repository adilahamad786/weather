
// Geo cordinate Api calling using callback pattern
const request = require("request");
require('dotenv').config();


const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}%20ra.json?types=place%2Cpostcode%2Caddress&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

    request({url, json : true}, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect to location servise ! Please check your internet connection !", {});
        } else if (body.features.length ===  0) {
            callback("Unable to find Location. Try another Search !", {})
        } else {
            callback(undefined, {
                location : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode;