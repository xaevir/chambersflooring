
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , nodemailer = require("nodemailer")
  , smtpTransport = nodemailer.createTransport("SMTP", {host: "localhost"})


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8060);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.logger('dev'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/synthetic-flooring', function(req, res) {
  res.render('synthetic', { title: 'Synthetic Flooring' });
})

app.get('/new-installations-and-retrofitting', function(req, res) {
  res.render('new-installations-and-retrofitting', { title: 'New Installations and Retrofitting'});
})

app.get('/sanding-and-refinishing', function(req, res) {
  res.render('sanding-and-refinishing', {title: 'Sanding and Refinishing'});
})

app.get('/references', function(req, res) {
  res.render('references', {title: 'References'});
})

app.get('/annual-recoating', function(req, res) {
  res.render('annual-recoating', {title: 'Annual Recoating'});
})

app.get('/contact', function(req, res) {
  res.render('contact', {title: 'Contact'});
})

app.post('/contact', function(req, res, next) {
  var html  = '<p>name: '+req.body.name+'</p>'
      html += '<p>email: '+req.body.email+'</p>'
      html += '<p>message: '+req.body.message+'</p>'
  email(
    {
      subject: 'Website Contact Page', 
      html: html 
    })
    res.send(req.body)
})

function email(opts) {
  if (app.settings.env === 'development')
    return console.log(opts.html)

  var message = {
      from: 'Website Contact Page <contact@chambersflooring.com>',
      // Comma separated list of recipients
      to: 'info@chambersflooring.com',
  }
  message.subject = opts.subject
  message.html = opts.html

  smtpTransport.sendMail(message, function(error, response){
    if(error)
      console.log(error);
    else
      console.log("Email sent: " + response.message);
    smtpTransport.close(); // shut down the connection pool, no more messages
  })
}


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
