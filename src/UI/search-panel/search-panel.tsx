import React from 'react';
import './search-panel.scss';

import { SearchProps, SearchState } from '../../interfaces';

class SearchPanel extends React.Component<SearchProps, SearchState> {
  componentStorage = '';

  constructor(props: SearchProps) {
    super(props);

    this.state = {
      searchQuery: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const searchQuery = localStorage.getItem('searchQuery');
    if (searchQuery) {
      this.setState({ searchQuery });
    }
  }

  componentWillUnmount() {
    localStorage.setItem('searchQuery', this.componentStorage);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value;
    localStorage.setItem('searchQuery', searchQuery);
    this.setState({ searchQuery: searchQuery });
  }

  render() {
    return (
      <div className="search-input">
        <input
          className="search-input__input"
          type="text"
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default SearchPanel;
