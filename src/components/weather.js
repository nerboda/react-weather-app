import React, { Component } from 'react';
import { kelvinToFahrenheit, capitalizeEachWord } from '../utilities';

export default class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: capitalizeEachWord(props.description),
      fahrenheit: parseFloat(kelvinToFahrenheit(props.temp), 2)
    };
  }

  // toggleUnit(e) {
  //   e.preventDefault();

  //   this.setState(prevState => ({
  //     isCelcius: !prevState.isCelcius
  //   }));
  // }

  render() {
    return (
      <div className="inline-block">
        <p>{this.state.fahrenheit}</p>
        <h3>{this.state.description}</h3>
      </div>
    )
  }
}
