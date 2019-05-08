const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended: true} ) );

app.listen( 8080, console.log('Listening on 8080') );

const fetch = require('node-fetch');

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
    let lat = req.body.lat;
    let long = req.body.long;
    let id = res.body.id;
    let client = clients.find( c => c.id === Number(id))
    fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`, 
        { 
            method: 'GET', 
            headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
        
    });
})