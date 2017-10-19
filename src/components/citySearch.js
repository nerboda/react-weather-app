import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Container } from 'semantic-ui-react'

const source = [];

export default class CitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [] };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '' })
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: result.title })
  }

  handleSearchChange(e, { value }) {
    this.setState({ isLoading: true, value })
    this.props.onChange(value);

    let component = this;

    if (value.length > 3) {
      fetch(`http://localhost:3000?city=${value}`).then(response => {
        return response.json();
      }).then(data => {
        let results = data.map(city => ({title: city}));
        component.setState({isLoading: false, results})
      });
    }
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <div className='third align-center'>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={results}
          value={value}
          minCharacters={3}
          aligned='right'
          {...this.props}
        />
      </div>
    )
  }
}
