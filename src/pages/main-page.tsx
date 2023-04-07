import { useState } from 'react';
import SearchBar from '../UI/search-bar/search-bar';
import RestCardWrapper from '../UI/rest-card-wrapper/rest-card-wrapper';
import ProgressBar from '../UI/progress-bar/progress-bar';
import SearchNotification from '../UI/search-notification/search-notification';

import { RestAuthorData } from 'interfaces';

function MainPage() {
  const [autors, setAutors] = useState<RestAuthorData[]>([]);
  const [notification, setNotification] = useState('');
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);

  return (
    <>
      <SearchBar
        responseCallBack={setAutors}
        notificationCallBack={setNotification}
        progressCallBack={setIsSearchInProgress}
      />
      <ProgressBar isInProgress={isSearchInProgress}></ProgressBar>
      <SearchNotification notification={notification}></SearchNotification>
      <RestCardWrapper restAuthorsData={autors} />
    </>
  );
}

export default MainPage;
