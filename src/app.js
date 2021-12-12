const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geoCode');
const forecast = require('./utils/forecast')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pranab Das'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pranab Das'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Pranab Das'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a Location.'
        })
    }
    geocode(req.query.address, (error, data) => {

        if (error) {
            return console.log(error);
        }


        forecast(data.latitude, data.longitude, (error, forecastData) => {

            if (error) {
                console.log(error);
            }

            res.send({
                address: req.query.address,
                location: data.location,
                forecast: forecastData
              
            })

        })

    })




})




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pranab Das',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pranab Das',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})