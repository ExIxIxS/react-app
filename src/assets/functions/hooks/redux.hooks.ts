import { SearchSelector } from 'interfaces';
import { change, selectSearch } from '../../../features/search/searchSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function getStoredValueSelector(type: string): SearchSelector {
  switch (type) {
    case 'searchQuery':
      return selectSearch;
    default:
      return selectSearch;
  }
}

function useAppStore(key: string, initialValue: string): [string, (value: string) => void] {
  const dispatch = useDispatch();
  const storedValue = useSelector(getStoredValueSelector(key));
  const [value, setValue] = useState(storedValue ?? initialValue);

  const changeValue = (arg: string) => {
    setValue(arg);
    dispatch(change(arg));
  };

  return [value, changeValue];
}

export { useAppStore };
