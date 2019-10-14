'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const project_routes = require('./routes/project');
const user_routes = require('./routes/user');

    // Créer application/json parser

 
// Créer application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurer headers et CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use('/api', project_routes);

app.use('/api', user_routes);


//Exporter le module

module.exports = app;

