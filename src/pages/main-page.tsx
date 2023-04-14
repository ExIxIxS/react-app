import { useEffect, useState } from 'react';
import SearchBar from '../UI/search-bar/search-bar';
import RestCardWrapper from '../UI/rest-card-wrapper/rest-card-wrapper';
import ProgressBar from '../UI/progress-bar/progress-bar';
import SearchNotification from '../UI/search-notification/search-notification';
import { useStoreSearchQuery, useStoreSearchResult } from '../assets/functions/hooks/redux.hooks';
import { useGetAuthorsByNameQuery } from '../services/openlibraryApi';
import { getRTKFetchErrorMessage } from '../assets/functions/handlers/error-handler-functions';
import { RestAuthorData } from 'interfaces';

function MainPage(): JSX.Element {
  const [restCards, setRestCards] = useStoreSearchResult([] as RestAuthorData[]);
  const [searchQuery, setSearchQuery] = useStoreSearchQuery('' as string);
  const { data, error, isLoading } = useGetAuthorsByNameQuery(searchQuery);
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!isLoading && !error && data) {
      setRestCards([...data]);
      setIsSearchInProgress(false);
      setNotification(data.length ? '' : 'Nothing found');
    }

    if (error) {
      const errorMessage = getRTKFetchErrorMessage(error);
      setNotification(errorMessage);
    }
  }, [isLoading, error, data]);

  useEffect(() => {
    setIsSearchInProgress(true);
  }, [searchQuery]);

  useEffect(() => {
    setIsSearchInProgress(false);
  }, [data]);

  return (
    <>
      <SearchBar searchQuery={searchQuery} updateSearchQuery={setSearchQuery} />
      <ProgressBar isInProgress={isSearchInProgress}></ProgressBar>
      <SearchNotification notification={notification}></SearchNotification>
      <RestCardWrapper restAuthorsData={restCards} />
    </>
  );
}

export default MainPage;
