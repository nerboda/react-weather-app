import React, { Component } from 'react';

export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <img className="icon" src={this.props.imageSource}/>
    );
  }
}
