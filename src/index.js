import _ from 'lodash';
import './utilities.js';
import './style.css';

window.onload = function() {
  getCoordinates(function(coords) {
    getWeather(coords, function(weather) {
      getJSON('https://ipinfo.io', function(location) {
        loadDataIntoDOM(location, weather);
      });
    });
  });
};

function loadDataIntoDOM(location, weather) {
  var city, state, temperature, description, icon;

  city = document.getElementById('city');
  state = document.getElementById('state');
  celcius = document.getElementById('celcius');
  temperature = document.getElementById('temperature');
  description = document.getElementById('description');
  icon = document.getElementById('icon');

  city.innerText = location.city;
  state.innerText = location.state;
  temperature.childNodes[1].innerText = weather.main.temp;
  temperature.childNodes[2].innerText = '&deg;C';
  description.innerText = capitalizeEachWord(weather.weather[0].description);
  icon.childNodes[0].src = weather.weather[0].icon;
}

function getCoordinates(_callback) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var coords = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };

    _callback(coords);
  });
}

function getWeather(coords, _callback) {
  var request, response, baseURL, fullURL, weather;

  baseURL = 'https://fcc-weather-api.glitch.me/api/current?lat={{lat}}&lon={{lon}}';
  fullURL = baseURL.replace(/{{lat}}/, coords.lat).replace(/{{lon}}/, coords.lon);

  getJSON(fullURL, _callback);
}

function toggleUnit(link) {
  var fahrenheith, celcius, degrees;

  degreesNode = document.getElementById('degrees');
  degrees = degreesNode.innerText;

  if (link.innerText === '℃') {
    link.innerText = '℉';
    degreesNode.innerText = celciusToFahrenheit(parseFloat(degrees));
  } else {
    link.innerText = '℃';
    degreesNode.innerText = fahrenheitToCelcius(parseFloat(degrees));
  }
}
