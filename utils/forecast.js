const request = require('postman-request')

// request({url: weatherURL, json: true}, (error, response) => {

//     if (error) {
//         console.log(`Can't connect to weather service api`)
//     } else if (response.body.error) {
//         console.log('Could not find location')
//     } else {
//         const currentWeather = response.body.current
//         console.log(`It is currently ${currentWeather.temperature} and ${currentWeather.weather_descriptions[0]}. It feels like ${currentWeather.feelslike}.`)
//     }
// })

const forecast = (latitude, longitude, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=13ac3ebd1d05ee16d14d13ce65a061e8&query=${latitude},${longitude}&units=m`

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback(`Unable to connect to API`, undefined)
        } else if (response.body.error) {
            callback(`Unable to find location, search again`, undefined)
        } else {
            callback (undefined, {
                location: response.body.location.name,
                country: response.body.location.country,
                temperature: response.body.current.temperature,
                weather: response.body.current.weather_descriptions[0],
                feelslike: response.body.current.feelslike,
                humidity: response.body.current.humidity,
                forecast: `It is currently ${response.body.current.temperature} and ${response.body.current.weather_descriptions[0]} in ${response.body.location.name}, ${response.body.location.country}.`,
                forecastDetails: `It feels like ${response.body.current.feelslike} with a humidity of ${response.body.current.humidity}`
            })
            console.log(`Location: ${response.body.location.name}, ${response.body.location.country}`)
            console.log(`Currently: ${response.body.current.temperature} and ${response.body.current.weather_descriptions[0]}`)
            console.log(`Feels like: ${response.body.current.feelslike}`)
        }
    })
}

module.exports = forecast