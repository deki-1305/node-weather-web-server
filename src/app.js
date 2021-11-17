const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {title: 'Weather', name: 'Dejan Pelagic'})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About us', name: 'Dejan Pelagic'})
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page', 
        message: 'This is Help message',
        name: 'Dejan Pelagic'
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return console.log(error)
        } 
    
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        } 
            
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
      })   
    }) 
     } else {
        res.send({error: 'Please provide an address.'});
     }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
    return res.send({
        error: 'please provide a search term'
    })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {title: '404', message: 'Page not found', 
    name: 'Dejan Pelagic'})
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})
