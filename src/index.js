import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createFragment from 'react-addons-create-fragment';
import LoadScreen from './components/loadScreen';
import Location from './components/location';
import LocationList from './components/locationList';
import { capitalizeEachWord } from './utilities';
import { Divider, Segment, Container, Header } from 'semantic-ui-react';
import { addLocation, removeLocation } from './actions';

import 'semantic-ui-css/semantic.min.css';
import './assets/weather-icons/sass/weather-icons.min.scss';
import './assets/style.css';

module.hot.accept();

/* 

Outline: a basic app that shows weather information for current location and allows you to add other locations

Details:
  - load current location and pass coordinates to Location component
    - use navigator geolocation to get current coordinates
    - api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={key}
    - api key -> 1f874c21b9ca244ffdc7f0573bfe1b7c
  - have an AddLocation component which requires you to manually enter location
    - state of the app is stored in redux store
    - dispatch an addLocation action
    - pass location props to location component
    - location component is responsible for fetching weather data
      - fetch weather data using city name
      - api.openweathermap.org/data/2.5/weather?q={city name}&appid={key}
      - api key -> 1f874c21b9ca244ffdc7f0573bfe1b7c
  - you can also remove locations
    - dispatch remove location action
    - pass index of location

Flow:
  - you load page, it says "Determining your location..."
  - once you allow geolocator, it renders the app with your location
  - once the component for your location is rendered, it gets weather info
  - once that weather info is received, component is updated
  - you can then add/remove locations
    - if you add a location, the component is rendered to the dom
      - weather info is then fetched for that location
      - once the data comes back, the comonent is updated
    - if you remove a location, an action is dispatched to update the store minus that location

*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { latitude: '', longitude: '' };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      this.setState({latitude, longitude});
    });
  }

  componentDidMount() {
    document.getElementById('load-screen').remove();
  }

  render() {
    if (this.state.latitude) {
      return (
        <div>
          <Container className='padded' textAlign='center'>
          <Header as='h1' size='huge'>Local Weather</Header>
          <Location
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            current />
          <Header>Add More Locations</Header>
            <LocationList />
          </Container>
        </div>
      );
    } else {
      return <Header/>
    }
  }
}

ReactDOM.render(
  <div>
    <LoadScreen/>
    <App/>
  </div>,
  document.getElementById('app')
);
