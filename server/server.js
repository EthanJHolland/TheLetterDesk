var express = require('express'),
app = express(),
port = 3000, // process.env.PORT || 3000
bodyParser = require('body-parser');

//allow access from all origins (from https://github.com/expressjs/cors)
var cors = require('cors');
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes'); //import routes
routes(app); //register routes

app.listen(port);
console.log('tld API server started on: ' + port);