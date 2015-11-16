//app.js

var express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	PORT = 1337,
	app = express(),
	routes = require('./routes/'),
	swig = require('swig');

// Swig boilerplate
app.set('views', __dirname + '/views'); // where to find views
app.set('view engine', 'html'); // what file extension they have
app.engine('html', swig.renderFile); // how to render html
swig.setDefaults({cache: false}); // always re-render

// HTTP body parsing (JSON or URL-encoded) middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submit
app.use(bodyParser.json()); // for AJAX (not used in this workshop)

// logging middleware
app.use(morgan('dev')); // logs req & res properties on response send

// dynamic routing
app.use('/', routes);

// static routing
app.use(express.static(__dirname + '/public'));

// if we got this far, we couldn't match the route, so send to error middleware
app.use(function(req, res, next){
  var err = new Error('could not find route');
  err.status = 404;
  next(err); // passing a truthy value to `next` goes to error middleware
});

// a custom error-handling middleware function
app.use(function(err, req, res, next){ // 4 params -> error-handling middleware
  res.status(err.status || 500).send('ERROR: ' + err.message);
});

// start our server
app.listen(PORT, function(){
  console.log('Listening to port', PORT);
});