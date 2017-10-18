import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

export default class CityState extends Component {
  constructor(props) {
    super(props);
    this.state = {city: '', state: ''};
  }

  componentDidMount() {
    if (this.props.current) {
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
    } else {
      this.setState({city: this.props.name})
    }
  }

  render() {
    return (
      <span>{this.state.city}, {this.state.state}</span>
    );
  };
}
