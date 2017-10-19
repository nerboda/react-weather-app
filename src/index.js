import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createFragment from 'react-addons-create-fragment';
import Location from './components/location';
import LocationList from './components/locationList';
import { capitalizeEachWord } from './utilities';
import { Divider, Segment, Container, Header, Loader } from 'semantic-ui-react';
import { addLocation, removeLocation } from './actions';

import 'semantic-ui-css/semantic.min.css';
import './assets/weather-icons/sass/weather-icons.min.scss';
import './assets/style.css';

module.hot.accept();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { latitude: '', longitude: '' };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      this.setState({latitude, longitude});
      
      setTimeout(function() {
        document.getElementById('load-screen').remove();    
      }, 500);
    });
  }

  render() {
    if (this.state.latitude) {
      return (
        <div>
          <Container className='padded current-location' textAlign='center'>
            <Header as='h1' size='huge'>Local Weather</Header>
            <Location
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              current />
          </Container>
          <Container>
            <LocationList/>
          </Container>
        </div>
      );
    } else {
      return <Loader active content='Loading'/>
    }
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
