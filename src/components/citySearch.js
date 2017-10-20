import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Container, Icon, Button } from 'semantic-ui-react'

export default class CitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value, searchResults: [], icon: 'search' };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '', icon: 'search' })
  }

  handleResultSelect(e, { result }) {
    this.props.onSubmit(result.title);
    this.resetComponent();
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

  renderResults(props) {
    const resultButton = (
      <Button
        compact
        icon='add'
        floated='right'
        name='add'
      />
    );

    return (
      <Search.Result
        title={props.title}
        renderer={({title}) => (
          <div className='title'>{title}{resultButton}</div>
        )} />
    );
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
          icon={this.state.icon}
          placeholder='Enter City or Zip'
          resultRenderer={this.renderResults}
          {...this.props}
        />
      </div>
    );
  }
}
