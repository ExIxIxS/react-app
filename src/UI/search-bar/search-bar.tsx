import { useEffect } from 'react';
import { useLocalStorage } from '../../assets/functions/hooks/localeStorage.hooks';
import { processSearch } from '../../assets/functions/rest/rest-functions';
import { getKeyDownHandler } from '../../assets/functions/handlers/event-handler-functions';
import { NotificationCallBack, SearchCallBack, SearchProgressCallBack } from 'interfaces';

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
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  useEffect(() => {
    processSearch(searchQuery, responseCallBack, notificationCallBack);
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
        onKeyDown={getKeyDownHandler<SearchCallBack, NotificationCallBack, SearchProgressCallBack>(
          'Enter',
          responseCallBack,
          notificationCallBack,
          progressCallBack
        )}
      />
    </div>
  );
}

export default SearchBar;
