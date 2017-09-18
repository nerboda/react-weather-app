import React, { Component } from 'react';
import { celciusToFahrenheit } from '../utilities';

export default class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
      celcius: parseFloat(props.temp, 2),
      fahrenheit: parseFloat(celciusToFahrenheit(props.temp), 2),
      isCelcius: false
    };

    this.toggleUnit = this.toggleUnit.bind(this);
  }

  toggleUnit(e) {
    e.preventDefault();

    this.setState(prevState => ({
      isCelcius: !prevState.isCelcius
    }));
  }

  render() {
    return (
      <div id="weather">
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
