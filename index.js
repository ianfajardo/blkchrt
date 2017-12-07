var express = require('express'),
    exphbs  = require('express-handlebars'),
    helpers = require('./lib/helpers'),
    config = require('./config');

var app = express();

var hbs = exphbs.create({
	defaultLayout	: 'main',
	helpers			: helpers
});

//app.use("/css", express.static(__dirname + '/css'));

app.use("/public", express.static(__dirname + '/public'));

app.use("/img", express.static(__dirname + '/img'));

app.set('port', (process.env.PORT || 5000));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function(request, response) {
  response.render('home', {
  	title: 'BlkChrt',
    url: '/list'
  });
});

app.get('/list', function(request, response){
  response.render('list', {
    title: 'BlkChrt List',
    url: '/'
  })
});

app.get('*', function(request, response){
  response.render('home', {
  	title: 'BlkChrt'
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
