function getJSON(url, _callback) {
  var request = new XMLHttpRequest();

  request.open('GET', url, true);
  request.setRequestHeader('Accept', 'application/json');
  request.send();

  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      _callback(JSON.parse(request.response));
    }
  }
}

function capitalizeEachWord(string) {
  return _.join(_.map(string.split(' '), (word) => {
    return word.replace(/^./, word[0].toUpperCase());
  }), ' ');
}

function celciusToFahrenheit(temp) {
  return (temp * 1.8 + 32).toFixed(2);
}

function fahrenheitToCelcius(temp) {
  return ((temp - 32) / 1.8).toFixed(2);
}

export { getJson, capitalizeEachWord, celciusToFahrenheit, fahrenheitToCelcius };
