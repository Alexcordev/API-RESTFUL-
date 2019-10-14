'use strict'
const mongoose = require('mongoose');
const port = 3999;

const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portefolio', {
  useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
            console.log('La connexion à la base de données est établie');

        app.listen(port, ()=>{
            console.log('Le serveur est fonctionel sur localhost:3999');
        });
            
    })

    .catch(error => console.log(error));