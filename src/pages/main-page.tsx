import { useState } from 'react';
import SearchBar from '../UI/search-bar/search-bar';
import RestCardWrapper from '../UI/rest-card-wrapper/rest-card-wrapper';
import ProgressBar from '../UI/progress-bar/progress-bar';
import SearchNotification from '../UI/search-notification/search-notification';

import { RestAuthorData } from 'interfaces';

function MainPage(): JSX.Element {
  const [restCards, setRestCards] = useState<RestAuthorData[]>([]);
  const [notification, setNotification] = useState('');
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);

  return (
    <>
      <SearchBar
        responseCallBack={setRestCards}
        notificationCallBack={setNotification}
        progressCallBack={setIsSearchInProgress}
      />
      <ProgressBar isInProgress={isSearchInProgress}></ProgressBar>
      <SearchNotification notification={notification}></SearchNotification>
      <RestCardWrapper restAuthorsData={restCards} />
    </>
  );
}

export default MainPage;
