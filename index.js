const express = require('express');
const app = express();
const queryString = require('query-string');
const request = require('request');


const API_KEY = '2f52d5d864cfc78ebc6e910f0d64be3e';
const API_URL = 'http://api.brewerydb.com/v2';

function stripPath(url,matcher){
  return url.replace(matcher, '');
}

function getUrl(url){
  const key = (url.indexOf('?') ? '&key' : '?key') + '=' + API_KEY
  return `${API_URL}${stripPath(url, '/proxy')}${key}`
}

app.get('/proxy*', (req, res) => {
  var options = {
    method: 'GET',
    url: getUrl(req.url)
  }
console.log(options.url)
  return request(options, (err, response, body) => {
    res.send(JSON.parse(body));
  });
});

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
//exports.app = functions.https.onRequest(app);
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
