const express = require('express');
const dotenv = require('dotenv');
const hbs = require('hbs');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const PublicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

// Setup handlebars engine and and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(PublicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title : "Weather",
        name : "Adil Ahamad"
    });
});

app.get('/about', (req, res) => { 
    res.render('about', {
        title : "About Me",
        name : "Adil Ahamad"
    });
});

app.get('/help', (req, res) => {    
    res.render('help', {
        title : "Help",
        helpText : "This is some helpful text.",
        name : "Adil Ahamad"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : "Please provide a address !"
        })
    }

    const address = req.query.address;

    geocode(address,(error, {location, latitude, longitude} = {}) => {    // Geo cordinate Api calling

        if (error) {
            return res.send({error});
        }       
    
        forecast(latitude, longitude,(error, foreCastData) => {    // Weather Api calling
    
            if (error) {
                return res.send({error});
            }
    
            res.send({
                location,
                forecast : foreCastData,
                address : address
            });
        })
    
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage : "Help artical not found !",
        title : '404',
        name : "Adil Ahamad"
    });
});


app.get('*', (req, res) => {   // also write this route in the end
    res.render('404', {
        errorMessage : "Page not found",
        title : '404',
        name : "Adil Ahamad"
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});