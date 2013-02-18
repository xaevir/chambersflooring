
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
  app.use(express.logger());
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

var locals = {}

app.configure('development', function(){
  app.use(express.errorHandler());
  locals.env = 'development'
});

app.configure('production', function(){
  locals.env = 'production'
});

/* redirect from www */
/*app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www\.chambersandsonsflooring\.com/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^www\.chambersandsonsflooring\.com/, 'chambersflooring.com') + req.url
    res.redirect(301, new_url);
  }
  else if (req.headers.host.match(/^chambersandsonsflooring\.com/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^chambersandsonsflooring\.com/, 'chambersflooring.com') + req.url
    res.redirect(301, new_url);
  }
  else if (req.headers.host.match(/^www\.chambersandsonflooring\.com/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^www\.chambersandsonflooring/, 'chambersflooring.com') + req.url
    res.redirect(301, new_url);
  }
  else if (req.headers.host.match(/^chambersandsonflooring\.com/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^chambersandsonflooring/, 'chambersflooring.com') + req.url
    res.redirect(301, new_url);
  }
  else if (req.headers.host.match(/^www/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^www\./, '') + req.url
    res.redirect(301, new_url);
  }
  else next();
});
*/

app.get('/', function(req, res) {
  locals.page = 'home'
  res.render('index', locals);
})

app.get('/new-installations-and-retrofitting', function(req, res) {
  locals.title ='New Installations and Retrofitting'
  locals.page = 'installations'
  res.render('new-installations-and-retrofitting', locals);
})

app.get('/annual-recoating', function(req, res) {
  locals.title = 'Annual Recoating'
  locals.page = 'recoating'
  res.render('annual-recoating', locals);
})

app.get('/synthetic-flooring', function(req, res) {
  locals.title = 'Synthetic Flooring'
  locals.page = 'synthetic'
  res.render('synthetic', locals);
})

app.get('/references', function(req, res) {
  locals.title = 'References'
  locals.page = 'references'
  res.render('references', locals);
})

app.get('/sanding-and-refinishing', function(req, res) {
  locals.title = 'Sanding and Refinishing'
  locals.page = 'sanding'
  res.render('sanding-and-refinishing', locals);
})

app.get('/contact', function(req, res) {
  locals.title = 'Contact'
  locals.page = 'contact'
  res.render('contact', locals);
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
