const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = 3000

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '..','public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//SEtup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        location: 'Winnipeg',
        createdBy: 'Asia Awan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Help',
        message: "Please Try again!",
        createdBy: 'Asia Awan'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Asia Awan',
        errorMessage: 'Help article not found.'
    })
})
app.get('/about', (req,res) => {
    res.render('about',{
        title:'About',
        image:'./img/robot.jpg',
        createdBy: 'Asia Awan'
    })
})

// app.get('', (req, res) => {
//     res.send('Hello express');
// })

// app.get('/help', (req, res) => {
    // res.send([
    //     {
    //         name: 'Asia',
    //         age:32
    //     },
    //     {
    //         name: 'Nazneen',
    //         age:28
    //     }
    // ])
    //res.send('help.html')
// })


// app.get('/about', (req,res) => {
//     res.send('<h1>About page</h1>')
   
//  })

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        
        if(error){
            return res.send({error} )
        }

        forecast(latitude, longitude, location, (error, forecastData) => {
            if(error) {
                return res.send( {error })
            }
            console.log(forecastData);
            res.send( {
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Asia Awan',
        errorMessage: 'Page not found.'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port 3000')
});