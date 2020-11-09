const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamVyZW15a3VuZyIsImEiOiJja2dqNXlubHEwNng5Mnltc21zN3kxenhuIn0.LTUcDG-ERXzph12VNFLhXA'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback(`Can't connect to API`, undefined)
        } else if (response.body.features.length === 0) {
            callback(`Location not found, search again`, undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode