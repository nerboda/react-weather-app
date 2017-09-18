import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header.js';
import CityState from './components/cityState.js';
import Weather from './components/weather.js';
import Icon from './components/icon.js';

import './style.css';

module.hot.accept();

function App() {
  return (
    <div>
      <Header/>
      <div>
        <CityState/><br/>
        <Weather/><br/>
        <Icon/>
      </div>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

