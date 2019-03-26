'use strict'

const express = require('express');
const path = require('path');
const hbs = require('hbs');

const getGeoLocation = require('./utils/getGeoLocation');
const forecast = require('./utils/forecast');

const app = express();

const publicPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('/', (req,res) => {
    res.render('index', {
        title: "Weather",
        location: "New York",
        name: "Egret Liu"
    });
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            err: "You must provide a search term"
        });
    }

    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Egret Liu"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "How to setup the server?",
        name: "Egret Liu"
    })
})

app.get("/help/*", (req, res) => {
    res.render("notFound", {
        title: "Help",
        message: "Help article not found",
        name: "Egret Liu"
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            err: "You have to provide an address"
        });
    }

    if(res.err) {
        return res.send({
            err: "Unable to find the location"
        });
    }

    getGeoLocation(req.query.address, (err, {latitude, longitude, place_name} = {}) => {
        if(err) {
            return res.send({
                err
            });
        }
        
        forecast(latitude, longitude, (err, {summary, temperature, precipProbability}) => {

            if(err) {
                return res.send({
                    err
                });
            }

            res.send({
                place_name,
                summary,
                temperature,
                precipProbability
            });
    
            console.log(`Current weather at ${place_name}:`);
    
            console.log(`${summary} Current temperature is ${temperature}. Probability of rain is ${precipProbability}.`);
        })
    })

})

app.get('*', (req, res) => {
    res.render("notFound", {
        title: "Weather",
        message: "Page not found",
        name: "Egret Liu"
    });
})

app.listen(3001, () => {
    console.log('Server is up on port 3001.');
});