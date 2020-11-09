const express = require('express')
const path = require('path')
const hbs = require('hbs');
const { send } = require('process');

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

// console.log(__dirname);
console.log(path.join(__dirname, '../public'))
console.log(__filename);

const app = express()

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars as our default template engine via express
// Set default views folder to customized name
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set static directory to serve (public)
app.use(express.static(publicDir))


// .get is how you send data for your website in express
// It takes 2 arguments
// first is the url extension they are visiting '' is root '/about' would be the about page
// second is the function of what to do when the user goes to that url extension (what to send them)

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jeremy Kung'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Jeremy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMsg: 'Help me!! just kidding',
        name: 'Jeremy Kung' 
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    const location = req.query.address

    geocode(location, (error, geoData) => {
        if (error) {
            return res.send(error)
        }
        forecast(geoData.latitude, geoData.longitude, (error, weatherData={}) => {
            if (error) {
                return res.send(error)
            }
            
            console.log('Geo Data: ', geoData)
            console.log('Weather Data: ', weatherData)
            res.send({
                search: location,
                weather: weatherData,
            })
        })
    }) 

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Jeremy',
        message: 'Help page not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Jeremy',
        message: 'Page not found!'
    })
})

// .listen is starting a port for the server
// the second argument is optional, but here it just tells us a port is started
app.listen(3000, () => {
    console.log(`Server started on port 3000`);
})