var express = require('express')
var app = express();
var routes = require('./routes');
var serveStatic = require('serve-static');
var user = require('./routes/user');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var errorhandler = require('errorhandler');
var nodemailer = require("nodemailer")
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'chambersflooring33@gmail.com', // Your email id
    pass: 'ironman33' // Your password
  }
});

var mailOptions = {
    from: 'chambersflooring33@gmail.com', // sender address
    to: 'pphillips@chambersflooring.com', // Comma separated list of recipients
    subject: 'Website Contact Form', // Subject line
    html: '' // HTML body
}

var port = process.env.PORT || 8060;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//app.use(express.favicon());
//app.use(express.methodOverride());
app.use(serveStatic(path.join(__dirname, 'public')));

var locals = {}

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.use(errorhandler())
  locals.env = 'development'
}

/* redirect from www */
app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www\.chambersandsonsflooring/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^www\.chambersandsonsflooring/, 'chambersflooring') + req.url
    res.redirect(301, new_url);
  }
  else if (req.headers.host.match(/^chambersandsonsflooring\.com/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^chambersandsonsflooring/, 'chambersflooring') + req.url
    res.redirect(301, new_url);
  }
  else if (req.headers.host.match(/^www\.chambersandsonflooring\.com/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^www\.chambersandsonflooring/, 'chambersflooring') + req.url
    res.redirect(301, new_url);
  }
  else if (req.headers.host.match(/^chambersandsonflooring\.com/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^chambersandsonflooring/, 'chambersflooring') + req.url
    res.redirect(301, new_url);
  }
  else if (req.headers.host.match(/^www/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^www\./, '') + req.url
    res.redirect(301, new_url);
  }
  else next();
});

app.get('/', function(req, res) {
  locals.title = ''
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

  mailOptions.html = html;

  //if (env === 'development')
  //  return console.log(html)

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.json({yo: 'error'});
    }else{
      console.log('Message sent: ' + info.response);
      res.json({yo: info.response});
    };
  });
})

app.listen(port);
console.log('Magic happens on port ' + port);
