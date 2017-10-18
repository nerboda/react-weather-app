import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

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

  className() {
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
      } else {
        className += '-clear';
      }
    } else {
      className += '-day';
      if (desc.match(/rain/)) {
        className += '-rain';
        if (desc.match(/wind/)) {
          className += '-wind';
        }
      } else if (desc.match(/cloud/)) {
        className += '-cloudy';
      } else {
        className += '-sunny';
      }
    }

    return className;
  }

  render() {
    return (
      <i className={'wi ' + this.className()} />
    );
  }
}
