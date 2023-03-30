import { useLocalStorage } from '../../assets/functions/hooks/localeStorage.hooks';

import './search-panel.scss';

function SearchPanel(): JSX.Element {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  return (
    <div className="search-panel">
      <input
        className="search-panel__input"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchPanel;
