var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var twitter = require('twitter');
var tw = require('./twitterTrendModule.js')

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../app'));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  var text = req.body.text.toLowerCase();
  var url = parseURL(text);
  console.log('text: ' + text);
  console.log('url: ' + url);

  // External API get request from url
  if (url === 'https://www.twitter.com') {

      var loc = req.body.text;
      var location = loc.slice(8);
      console.log(location);
      var params = {id: tw.placeID(location)};
      console.log(tw.placeID(location));
      tw.twitterGetter(params, function (twitData) {
        res.send(twitData);
      });
      
  } else {

    axios.get(url)
      .then(function(response) {
        res.send(response.data); // Send data to client for rendering
      })
      .catch(function (response) {
        console.log('GET request from ' + url + ' unsuccessful: ' + response);
      });
  }
});

app.listen(port, function () {
  console.log('Server listening on port 3000');
});

tw.working();

function parseURL(text) {
  var url;
  var word = text.split(' ').slice(1);

  if (text.includes('google')) {
    word = word.join(' ');
    url = 'https://www.google.com/search?q=' + word;
  } else if (text.includes('reddit')) {
    word = word.join('');
    url = 'https://www.reddit.com/r/' + word;
  } else if (text.includes('twitter')) {
    url = 'https://www.twitter.com'
  }

  return url;
}

