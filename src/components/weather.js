import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
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
      <span>{`${this.state.fahrenheit} \u2109 ${this.state.description}`}</span>
    );
  }
}
