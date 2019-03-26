const request = require('request');

const forecast = (lati, longi, callback) => {
    const url = `https://api.darksky.net/forecast/2245c17b9049c1d9ceac9bd1b49daff2/${lati},${longi}?units=si`;
    request({url, json: true}, (err, response, body) => {
        if(err){
            callback("Cannot connect tp weather service", undefined);
        }else if(body.error){
            callback("Unable to find the weather of the location", undefined);
        }else{
            const {temperature, precipProbability} = body.currently;
            const {summary} = body.daily.data[0]
            callback(undefined, {
                summary,
                temperature,
                precipProbability
            });
        }
    });
}

module.exports = forecast;