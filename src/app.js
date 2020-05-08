const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()


// Setup handle bars
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join( __dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
const publicDirPath = path.join( __dirname, '../public' )
app.use(express.static(publicDirPath))


// Main page
app.get('/', ( req, res )=>{
    res.render('weather', {
        title: 'Weather',
        name: 'Jayvee'
    })
})


// Weather
app.get('/weather', ( req, res )=>{
    if( req.query.address ){
        var {address} = req.query 
        geocode.mapBoxGetGeo( address, function( err, { latitude, longtitude, location}){
            if( !err ){
                forecast.get( latitude, longtitude, function(err, { description = 'No cloud forecast.', temperature, feelslike }){
                    if( !err ){
                        let forecast = description + '. It is currently '+ temperature +' degrees out. It feels like '+ feelslike +' degrees out.'
                        res.send({ 'error': false, data:{  location, forecast  }})
                    }else{
                        res.send({  error: 'err' })
                    }
                })
            }else{
                res.send({  error: 'err' })
            }
        })

    }else{
        res.send({
            error: true,
            location: 'You must provide an address'
        })
    }

})


// Help page
app.get('/help', ( req, res )=>{
    res.render('help', {
        title: 'Help',
        name: 'Jayvee'
    })
})

// About page
app.get('/about', ( req, res )=>{
    res.render('about', {
        title: 'About us',
        name: 'Jayvee'
    })
})


app.get('/help/*', ( req, res )=>{
    res.render('helpNotFound', {
        title: 'Help article not found',
        name: 'Jayvee'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found.',
        name: 'Jayvee'
    })
})


app.listen(3000, function(){
    console.log('api is running at port 3000')
})