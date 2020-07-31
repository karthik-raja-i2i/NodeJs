const express = require('express');
const bodyParser = require('body-parser');

// create express server
const app = express();

//middleware to parse req body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//configuring routes to the server
// the server instance is set as the parameter
require('./routes')(app);

//starting the server at 3000 port
app.listen(3000,()=> {
    console.log('running');
});