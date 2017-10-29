var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes'); //importing route
routes(app); //register the route

//handle unknown api requests

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});

app.listen(port);
console.log('tld API server started on: ' + port);