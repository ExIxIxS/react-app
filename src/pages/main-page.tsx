import { Component } from 'react';
import SearchPanel from '../UI/search-panel/search-panel';

import CardWrapper from '../UI/card-wrapper/card-wrapper';
import cardData from '../assets/cardsDB';

class MainPage extends Component {
  render() {
    return (
      <>
        <SearchPanel />
        <CardWrapper cards={cardData} />
      </>
    );
  }
}

export default MainPage;
