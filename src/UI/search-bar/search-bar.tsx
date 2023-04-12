import { useEffect, useState } from 'react';
import { useAppStore } from '../../assets/functions/hooks/redux.hooks';
import { processSearch } from '../../assets/functions/rest/rest-functions';
import { getKeyDownHandler } from '../../assets/functions/handlers/event-handler-functions';
import {
  NotificationCallBack,
  SearchCallBack,
  SearchProgressCallBack,
  SearchStateCallBack,
} from 'interfaces';

import './search-bar.scss';

function SearchBar({
  responseCallBack,
  notificationCallBack,
  progressCallBack,
}: {
  responseCallBack: SearchCallBack;
  notificationCallBack: NotificationCallBack;
  progressCallBack: SearchProgressCallBack;
}): JSX.Element {
  const [searchQuery, setSearchQuery] = useAppStore('searchQuery', '');
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    processSearch(searchQuery, responseCallBack, notificationCallBack);
  }, []);

  return (
    <div className="search-panel">
      <input
        className="search-panel__input"
        type="text"
        value={searchInput}
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchInput(e.target.value);
        }}
        onKeyDown={getKeyDownHandler<
          SearchCallBack,
          NotificationCallBack,
          SearchProgressCallBack,
          SearchStateCallBack
        >('Enter', responseCallBack, notificationCallBack, progressCallBack, setSearchQuery)}
      />
    </div>
  );
}

export default SearchBar;
