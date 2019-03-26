const request = require("request");

const getGeoLocation = (loc, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(loc) + ".json?limit=1&access_token=pk.eyJ1IjoiZWdyZXQ5OSIsImEiOiJjanRqaGttNXIyenRiNDVvMzV2ZTRweGpiIn0.83P3YVu0Cxla7Jb9rYOJMA";

    request({url, json: true}, (err, response, body) => {
        if(err){
            callback("Unable to connect to location services.", undefined);
        }else if(body.features.length === 0){
            callback("Location not found.", undefined);
        }else{
            const {center, place_name} = body.features[0];
            const [longitude, latitude] = center;

            callback(undefined, {
                latitude,
                longitude,
                place_name
            });
        }
    })
}

module.exports = getGeoLocation;