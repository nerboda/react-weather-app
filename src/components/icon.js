import React, { Component } from 'react';
import Fuse from 'fuse.js';
import { NightClasses, DayClasses } from '../addons/weatherIconClasses';

export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
      time: new Date().getHours()
    };
  }

  componentDidMount() {

  }

  imageSource() {
    let desc = this.state.description;
    let time = this.state.time;
    let className = 'wi';
    
    if (time > 7 && time < 6) {
      className += '-night';
      if (desc.match(/rain/)) {
        className += '-rain';
        if (desc.match(/wind/)) {
          className += '-wind';
        }
      } else if (desc.match(/cloud/)) {
        className += '-cloudy';
      }
    } else {
      className += 'day';
    }

    console.log(fuse);
    let result = fuse.search(this.state.description);
    console.log(this.state.description);
    console.log(dayOrNight);
    console.log(result);
  }

  render() {
    return (
      <img className="icon" src={this.imageSource()}/>
    );
  }
}

/*

- day or night?
  - if after 8pm and before 5am, show night
  - else show day
- description
  - 
- addons?
  - wind?
  - thunder?
*/
