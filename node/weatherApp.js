var express = require('express');
var app = express();

var http = require('http');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/weather/forecast', function(req, res){
	var zip = req.param('zip');
	if (!zip) {
		console.error('Did not receive a zip code in the query string.');
		return null;
	}

	return getLocation(zip, res);
});

app.listen(3000);

function getLocation(zip, res) {
	var options = {
		host : 'api.wunderground.com',
		path : '/api/efab6c9ee68ae5c6/geolookup/q/' + zip + '.json'
	};

	http.get(options, function(response) {
		var body = '';
		response.on('data', function(d) {
			body += d;
		});
		response.on('end', function(d) {
			var locationData = JSON.parse(body);
			if (!locationData || !locationData.location) {
				res.send(null);
				return;
			}

			getForecast(locationData.location.city, locationData.location.state, res);
		});
	});
}

function getForecast(city, state, res) {
	var options = {
		host : 'api.wunderground.com',
		path : '/api/efab6c9ee68ae5c6/forecast10day/q/' + state + '/' + city.replace(' ', '_') + '.json'
	};

	http.get(options, function(response) {
		var body = '';
		response.on('data', function(d) {
			body += d;
		});
		response.on('end', function(d) {
			res.send(body);
		});
	});
}