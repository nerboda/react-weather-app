import React, { Component } from 'react';
import Location from './location';
import { Form, Input } from 'semantic-ui-react';

class LocationList extends Component {
  constructor(props) {
    super(props);
    this.state = { newLocation: {} };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, location) {
    this.setState({newLocation: location.value});
    console.log(this.state);
  }

  render() {
    const { locations, addLocation } = this.props;
    return (
      <div>
        {locations.map(location => (
          <div>
            <Location key={location.id} latitude={location.latitude} longitude={location.longitude}/>
          </div>
        ))}
        <Form onSubmit={this.props.addLocation}>
          <Input action={{ icon: 'add' }} placeholder='City Name or Zip' onChange={this.handleChange}/>
        </Form>
      </div>
    );
  }

}

export default LocationList;
