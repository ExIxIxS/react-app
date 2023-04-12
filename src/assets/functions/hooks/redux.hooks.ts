import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchQuery, selectSearchQuery } from '../../../features/search/searchQuerySlice';

function useStoreSearcQuery(initialValue: string): [string, (value: string) => void] {
  const dispatch = useDispatch();
  const storedValue = useSelector(selectSearchQuery);
  const [value, setValue] = useState(storedValue ?? initialValue);

  const changeValue = (arg: string) => {
    setValue(arg);
    dispatch(changeSearchQuery(arg));
    console.log(`dispatch(changeSearchQuery(arg)) --> ${arg}`);
  };

  return [value, changeValue];
}

export { useStoreSearcQuery };
