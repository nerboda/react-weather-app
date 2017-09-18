import React, { Component } from 'react';

export default class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      celcius: 0,
      fahrenheit: 0,
      isCelcius: false
    };

    this.toggleUnit = this.toggleUnit.bind(this);
  }

  celciusToFahrenheit(temp) {
    return (temp * 1.8 + 32).toFixed(2);
  }

  toggleUnit(e) {
    e.preventDefault();

    this.setState(prevState => ({
      isCelcius: !prevState.isCelcius
    }));
  }

  componentDidMount() {
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
        this.setState({
          description: data.weather[0].main,
          celcius: parseFloat(data.main.temp, 2),
          fahrenheit: this.celciusToFahrenheit(parseFloat(data.main.temp, 2))
        })
      });
    });
  }

  render() {
    return (
      <div id="temperature">
        <p>{this.state.isCelcius ? this.state.celcius : this.state.fahrenheit}&nbsp;
          <a href="#" onClick={this.toggleUnit}>
            {this.state.isCelcius ? '\u2103': '\u2109'}
          </a>
        </p>
        <h3>{this.state.description}</h3>
      </div>
    )
  }
}
