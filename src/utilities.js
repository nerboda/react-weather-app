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

function kelvinToFahrenheit(temp) {
  return ((temp / (5/9)) - 459.67).toFixed(2);
}

export { capitalizeEachWord, celciusToFahrenheit, fahrenheitToCelcius, kelvinToFahrenheit };
