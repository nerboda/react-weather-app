import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import createFragment from 'react-addons-create-fragment';
import Header from './components/header';
import CityState from './components/cityState';
import Weather from './components/weather';
import Icon from './components/icon';
import { capitalizeEachWord } from './utilities';

import './assets/style.css';
import './assets/weather-icons/sass/weather-icons.min.scss';

module.hot.accept();

function App() {
  return (
    <div>
      <Header/>
      <div>
        <CityState/><br/>
        <Weather temp={weather.temp} description={weather.description}/><br/>
        <Icon description={weather.description}/>
      </div>
    </div>
  );
}

let weather = { temp: 0, description: ''};

navigator.geolocation.getCurrentPosition(position => {
  const {latitude, longitude} = position.coords;
  const baseURL = 'https://fcc-weather-api.glitch.me/api/current';
  const URL = `${baseURL}?lat=${latitude}&lon=${longitude}`;
  
  fetch(URL, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    return response.json();
  }).then(data => {
    const {main: {temp}, weather: [{description}]} = data;
    weather.temp = temp;
    weather.description = capitalizeEachWord(description);

    ReactDOM.render(
      <App/>,
      document.getElementById('app')
    );
  });
});
