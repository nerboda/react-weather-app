import React, { Component } from 'react';
import CityState from './cityState';
import Weather from './weather';
import Icon from './icon';
import { Divider, Segment, Button } from 'semantic-ui-react';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', temp: '', description: '' };
  }

  weatherApiUrl() {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
    const appId = '1f874c21b9ca244ffdc7f0573bfe1b7c';
    const {latitude, longitude, zip, name} = this.props;

    if (typeof zip !== 'undefined') {
      return `${baseURL}?zip=${zip},us&appid=${appId}`;
    } else if (typeof name !== 'undefined') {
      return `${baseURL}?q=${name},us&appid=${appId}`;
    } else {
      return `${baseURL}?lat=${latitude}&lon=${longitude}&appid=${appId}`;
    }
  }

  componentWillMount() {
    fetch(this.weatherApiUrl(), {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      const {name, main: {temp}, weather: [{description}]} = data;
      this.setState({name, temp, description})
    });
  }

  render() {
    if (this.state.name) {
      return (
        <Segment>
          { this.props.current
            ? <Divider horizontal>Your Location</Divider>
            : null
          }
          <CityState name={this.state.name} current={ this.props.current ? true : null }/>
          <Weather temp={this.state.temp} description={this.state.description}/>
          <Icon description={this.state.description}/>
          { !this.props.current
            ? <Button onClick={() => this.props.handleRemove(this.props.id)}>Remove Location</Button>
            : null
          }
        </Segment>
      );
    } else {
      return null;
    }
  }
}

export default Location;
