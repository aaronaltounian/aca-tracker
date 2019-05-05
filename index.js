const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended: true} ) );

app.listen( 8080, console.log('Listening on 8080') );

let lastClientId = 0;
let clients = [];

app.post('/clients', ( req, res ) => {
    lastClientId++;
    newClient = {
        name: req.body.name,
        clientId: lastClientId,
        lat: '',
        long: '',
        location: '',
    }

    clients.push(newClient);
    res.json(newClient);
})

app.get('/clients', ( req, res ) => {
    res.json(clients);
})

app.post('/locations', ( req, res ) => {
    
})