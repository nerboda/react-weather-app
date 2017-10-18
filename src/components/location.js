import React, { Component } from 'react';
import CityState from './cityState';
import Weather from './weather';
import Icon from './icon';
import { Divider, Segment, Button, List } from 'semantic-ui-react';

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
      if (this.props.current) {
        return (
          <Segment>
            <Divider horizontal>Your Location</Divider>
            <CityState name={this.state.name} current={ this.props.current ? true : null }/>
            <Weather temp={this.state.temp} description={this.state.description}/>
            <Icon description={this.state.description}/>
          </Segment>
        );
      } else {
        return (
          <List.Item>
            <List.Content floated='right'>
              <Button onClick={() => this.props.handleRemove(this.props.id)}>Remove Location</Button>
            </List.Content>
            <Icon description={this.state.description}/>
            <List.Content>
              <List.Header>
                <CityState name={this.state.name} current={ this.props.current ? true : null }/>
              </List.Header>
              <List.Description>
                <Weather temp={this.state.temp} description={this.state.description}/>
              </List.Description>
            </List.Content>
          </List.Item>
        );
      }
    } else {
      return null;
    }
  }
}

export default Location;
