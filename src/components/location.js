import React, { Component } from 'react';
import CityState from './cityState';
import Weather from './weather';
import Icon from './icon';
import { Divider, Segment, Button } from 'semantic-ui-react';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = { temp: '', description: '' };
  }

  componentWillMount() {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
    const appId = '1f874c21b9ca244ffdc7f0573bfe1b7c';
    const {latitude, longitude} = this.props;
    const URL = `${baseURL}?lat=${latitude}&lon=${longitude}&appid=${appId}`;
    
    fetch(URL, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      const {main: {temp}, weather: [{description}]} = data;
      this.setState({temp, description})
    });
  }

  render() {
    return (
      <Segment>
        { this.props.current
          ? <Divider horizontal>Your Location</Divider>
          : null
        }
        <CityState/>
        <Weather temp={this.state.temp} description={this.state.description}/>
        <Icon description={this.state.description}/>
        { !this.props.current
          ? <Button onClick={() => (console.log(this))}>Remove Location</Button>
          : null
        }
      </Segment>
    );
  }
}

export default Location;
