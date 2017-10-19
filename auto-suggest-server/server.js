const http = require('http');
const cities = require('./cities-and-states');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

// exposes single endpoint that returns all US cities that match ?city query
// domain.com?city=Grand%20Junction
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.statusCode = 200;

  const urlParts = url.parse(req.url, true);
  const city = urlParts.query.city;
  
  console.log("Searching for cities matching " + city);
  
  const matchingCities = cities.matching(city);
  
  console.log("Returned " + matchingCities.length + " cities.")
  
  const responseBody = JSON.stringify(matchingCities);
  res.end(responseBody);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
