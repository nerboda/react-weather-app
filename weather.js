/*

User stories:
  - I can see the weather for my current location
    - html5 geolocation
    - free code camp weather api https://fcc-weather-api.glitch.me/
  - I can push a button to toggle between fahrenheit and celcius

# Weather for current location

Understand the problem:
  - get user location coords
  - get city/state from ipinfo
    - $.get("http://ipinfo.io", function(response) {
          console.log(response.city, response.country);
      }, "jsonp");
  - send coords to fcc api
  - show city/state, temperature, description, icon on page
    - get icon from weather-icons stylesheet
    - icon changes depending on description
    - components: city, weather, temperature, icon
      - city: get from ipinfo
      - weather: description from first object of "weather" key/value from the response object
      - temperature: convert from fahrenheit by default, allow for toggling
      - icon: link is included in json - weather[0].icon
  - toggle between fahrenheit and celcius
    - start with celcius
    - toggle on click
      - hide celcius, show fahrenheit
      - vice versa

Examples/Test cases:
  - Fort Collins, CO
    - latitude: 40.6006347, longitude: -105.0094091
    - request: https://fcc-weather-api.glitch.me/api/current?lat=40.6006347&lon=-105.0094091
    - response: {"coord":{"lon":-105.01,"lat":40.6},"weather":[{"id":701,"main":"Mist","description":"mist"},{"id":721,"main":"Haze","description":"haze","icon":"50d"}],"base":"stations","main":{"temp":11.56,"pressure":1021,"humidity":66,"temp_min":9,"temp_max":13},"visibility":16093,"wind":{"speed":3.1,"deg":190},"clouds":{"all":40},"dt":1505581080,"sys":{"type":1,"id":3074,"message":0.0041,"country":"US","sunrise":1505565764,"sunset":1505610332},"id":5577147,"name":"Fort Collins","cod":200}
    - city: Fort Collins, CO
    - weather: Mist (description)
    - temperature: 11.56 celcius, 52.808 fahrenheit
    - icon: light rain

Step by step:
  - get user location coords
    - navigator.geolocation.getCurrentPosition(function(position) {
      // position object
    })
  - pass those to fcc weather api
    - url: https://fcc-weather-api.glitch.me/api/current?lat=40.6006347&lon=-105.0094091
  - get user location city/state using ipinfo
  - update page
    - target elements and change inner text
  - toggle:
    - 
*/

window.onload = function() {
  getCoordinates(function(coords) {
    getWeather(coords, function(weather) {
      getCityState(function(location) {
        loadDataIntoDOM(location, weather);
      })
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

// function getJSON(url, _callback) {
//   var request = new XMLHttpRequest();
//   request.open('GET', url, true);
//   request.setRequestHeader('Accept', 'application/json');
//   request.send();

//   request.onreadystatechange = function() {
//     if (request.readyState === XMLHttpRequest.DONE) {
//       _callback(request.response);
//     }
//   }
// }

function getWeather(coords, _callback) {
  var request, response, baseURL, fullURL, weather;

  baseURL = 'https://fcc-weather-api.glitch.me/api/current?lat={{lat}}&lon={{lon}}';
  fullURL = baseURL.replace(/{{lat}}/, coords.lat).replace(/{{lon}}/, coords.lon);
  request = new XMLHttpRequest();
  request.open('GET', fullURL, true);
  request.setRequestHeader('Accept', 'application/json');
  request.send();

  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      weather = JSON.parse(request.response);

      _callback(weather);
    }
  }
}

function getCityState(_callback) {
  var request, response, city, state;

  request = new XMLHttpRequest();
  request.open('GET', 'http://ipinfo.io', true);
  request.setRequestHeader('Accept', 'application/json');
  request.send();

  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      response = JSON.parse(request.response);

      _callback({ city: response.city, state: response.region, country: response.country });
    }
  }
}

function toggle(e) {
  var fahrenheith, celcius, degrees;
  degreesNode = document.getElementById('degrees');
  degrees = degreesNode.innerText;

  if (e.innerText === '℃') {
    e.innerText = '℉';
    degreesNode.innerText = celciusToFahrenheit(parseFloat(degrees));
  } else {
    e.innerText = '℃';
    degreesNode.innerText = fahrenheitToCelcius(parseFloat(degrees));
  }
}

function capitalizeEachWord(string) {
  var words = string.split(' ');

  return words.map(function(word) {
    return word.replace(/^./, word[0].toUpperCase());
  }).join(' ');
}

function celciusToFahrenheit(temp) {
  return (temp * 1.8 + 32).toFixed(2);
}

function fahrenheitToCelcius(temp) {
  return ((temp - 32) / 1.8).toFixed(2);
}
