
// Weather Api calling using callback pattern
const request = require("request");
require('dotenv').config();


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.OPEN_WEATHER_APP_ID}`;
    
    request({url, json : true}, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect Weather App ! Please check your internet connection !", {});
        } else if (body.message) {
            callback("Unable to find Location !", {});
        } else {
            callback(undefined, "It is currently " + body.current.temp + " degree out ! and Weather is " + body.current.weather[0].main);
        }
    })
}

module.exports = forecast;