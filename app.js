
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , yaml = require('js-yaml')
  , message = require('./models/message')
  , _ = require('underscore');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // This simple MVP version doesn't need more than the API endpoints

  // app.use(app.router);
  // app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// Mandrill needs a valid GET equivelant of the POST endpoint
app.get('/', function(req, res) {
  res.statusCode = 200;
  res.send("OK");
});


// Mandrill webhook endpoint
app.post('/', function(req, res) {
  var mandrill_incoming = JSON.parse(req.body.mandrill_events);

  for (var i = mandrill_incoming.length - 1; i >= 0; i--) {
    message.parse(mandrill_incoming[i].msg);
  };

  res.statusCode = 200;
  res.send("OK");
});



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
