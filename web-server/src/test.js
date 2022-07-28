const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();

const port = 3000;


// Defined paths for static files
const publicPathRoute = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');
const viewPath = path.join(__dirname, '../templates/views');

// Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialPath)

app.use(express.static(publicPathRoute));

//Set de engine view for dynamic HTML pages

// Handlebars for landing page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'AlgunFede'
    })
})

// Handlebars for 'About' page

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Lionel Messi'
    })
})

// Handlebars for 'Help' page

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jack Nicholson'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Cannot found help article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Cannot find the page :/'
    })
})

app.listen(port, () => {
    console.log(`Testing server on port ${port}`)
})