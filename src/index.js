import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.js';
import CityState from './components/cityState.js';
import Description from './components/description.js';
import Icon from './components/icon.js';
import Temperature from './components/temperature.js';
import './style.css';

module.hot.accept();

function App() {
  return (
    <div>
      <Header/>
      <div id="weather">
        <CityState/><br/>
        <Temperature/>
        <Description/><br/>
        <Icon/>
      </div>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

