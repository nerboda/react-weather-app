import React, { Component } from 'react';

export default class CityState extends Component {
  constructor(props) {
    super(props);
    this.state = {city: '', state: ''};
  }

  componentDidMount() {
    fetch('https://ipinfo.io', {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        city: data.city,
        state: data.region
      })
    });
  }

  render() {
    return (
      <div>
        <h3>{this.state.city}, {this.state.state}</h3>
      </div>
    );
  };
}
