import { useEffect } from 'react';
import { useLocalStorage } from '../../assets/functions/hooks/localeStorage.hooks';
import { processSearch } from '../../assets/functions/rest/rest-functions';
import { getKeyDownHandler } from '../../assets/functions/handlers/event-handler-functions';
import { SearchCallBack } from 'interfaces';

import './search-panel.scss';

function SearchPanel({ responseCallBack }: { responseCallBack: SearchCallBack }): JSX.Element {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  useEffect(() => {
    processSearch(searchQuery, responseCallBack);
  }, []);

  return (
    <div className="search-panel">
      <input
        className="search-panel__input"
        type="text"
        value={searchQuery}
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(e.target.value);
        }}
        onKeyDown={getKeyDownHandler<SearchCallBack>('Enter', responseCallBack)}
      />
    </div>
  );
}

export default SearchPanel;
