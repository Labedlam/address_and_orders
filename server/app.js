/**
 * Created by Zeo on 11/16/15.
 */
var express = require('express');
var app = express();
var bodyParser= require('body-parser');

var index = require('./routes/index.js');
var addresses= require('./routes/addresses.js');
var orders= require('./routes/orders.js');

//set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Here is where the middleware goes
app.use('/orders',orders);
app.use('/addresses',addresses);
app.use('/', index);


// Set node to listen on a port
app.set("port",( process.env.PORT || 5000)); // *** Study again
app.listen(app.get('port'),function(){
    console.log('listening to port',app.get('port'));

});