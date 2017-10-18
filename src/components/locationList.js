import React, { Component } from 'react';
import Location from './location';
import { Form, Input, List, Segment, Header, Divider, Container } from 'semantic-ui-react';
import { createStore } from 'redux';
import locationListReducer from '../reducers';
import { addLocation, removeLocation } from '../actions';

const store = createStore(locationListReducer);

class LocationList extends Component {
  constructor(props) {
    super(props);
    this.state = { newLocation: {} };
    this.handleChange = this.handleChange.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  handleChange(event, location) {
    this.setState({newLocation: location.value});
  }

  zipNameOrCoords(data) {
    data = data || '';

    if (data.match(/\d{5}/)) {
      return { zip: data };
    } else {
      return { name: data };
    }
  }

  addLocation() {
    const data = this.zipNameOrCoords(this.state.newLocation);
    store.dispatch(addLocation(data));
    this.forceUpdate();
  }

  removeLocation(id) {
    store.dispatch(removeLocation(parseInt(id, 10)));
    this.forceUpdate();
  }

  render() {
    const locations = store.getState().locations;

    return (
      <Segment>
        <Divider horizontal>Add More Locations</Divider>
        <List divided relaxed verticalAlign='middle'>
          {locations.map(location => (
            <Location
              key={location.id.toString()}
              id={location.id.toString()}
              zip={location.zip}
              name={location.name}
              latitude={location.latitude}
              longitude={location.longitude}
              handleRemove={this.removeLocation}
            />
          ))}
        </List>
        <Container textAlign='center'>
          <Form onSubmit={this.addLocation}>
            <Input action={{ icon: 'add' }} placeholder='City Name or Zip' onChange={this.handleChange}/>
          </Form>
        </Container>
      </Segment>
    );
  }

}

export default LocationList;
