import { useState } from 'react';
import { getKeyDownHandler } from '../../assets/functions/handlers/event-handler-functions';

import './search-bar.scss';

function SearchBar({
  searchQuery,
  updateSearchQuery,
}: {
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
}): JSX.Element {
  const initialSearchQuery = searchQuery;
  const [searchInput, setSearchInput] = useState(initialSearchQuery);

  return (
    <div className="search-panel">
      <input
        className="search-panel__input"
        type="text"
        value={searchInput}
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchInput(e.target.value);
        }}
        onKeyDown={getKeyDownHandler('Enter', updateSearchQuery)}
      />
    </div>
  );
}

export default SearchBar;
