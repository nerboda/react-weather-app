import React, { Component } from 'react';
import Location from './location';
import { Form, Input, List, Segment, Header,
          Divider, Container, Search } from 'semantic-ui-react';
import { createStore } from 'redux';
import locationListReducer from '../reducers';
import { addLocation, removeLocation } from '../actions';
import CitySearch from './citySearch';

const store = createStore(locationListReducer);

class LocationList extends Component {
  constructor(props) {
    super(props);
    this.state = { newLocation: '' };
    this.handleChange = this.handleChange.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  handleChange(location) {
    this.setState({newLocation: location});
  }

  zipNameOrCoords(data) {
    const input = data || '';

    if (input.match(/\d{5}/)) {
      return { zip: data };
    } else {
      return { name: data };
    }
  }

  addLocation() {
    const data = this.zipNameOrCoords(this.state.newLocation);
    store.dispatch(addLocation(data));
    this.setState({newLocation: ''})
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
            <CitySearch
              onSubmit={this.addLocation}
              onChange={this.handleChange}
            />
          </Form>
        </Container>
      </Segment>
    );
  }

}

export default LocationList;
