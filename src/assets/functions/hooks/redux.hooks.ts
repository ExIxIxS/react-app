import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchQuery,
  selectSearchQuery,
} from '../../../appStore/features/search/searchQuerySlice';
import {
  changeSearchResult,
  selectSearchResult,
} from '../../../appStore/features/search/searchResultSlice';
import {
  changeFormSubmitResult,
  selectFormSubmitResult,
} from '../../../appStore/features/forms/formSubmitSlice';
import { RestAuthorData, SerialFormInputData } from 'interfaces';

function useStoreSearchQuery<T extends string = string>(initialValue: T): [T, (value: T) => void] {
  const dispatch = useDispatch();
  const storedValue = useSelector(selectSearchQuery) as T;
  const [value, setValue] = useState(storedValue ?? initialValue);

  const changeValue = (arg: T) => {
    dispatch(changeSearchQuery(arg));
    setValue(arg);
  };

  return [value, changeValue];
}

function useStoreSearchResult<T extends RestAuthorData[] = RestAuthorData[]>(
  initialValue: T
): [T, (value: T) => void] {
  const dispatch = useDispatch();
  const storedValue = useSelector(selectSearchResult) as T;
  const [value, setValue] = useState(storedValue ?? initialValue);

  const changeValue = (arg: T) => {
    const dataArr = arg.sort((a, b) => b.work_count - a.work_count);
    dispatch(changeSearchResult(dataArr));
    setValue(dataArr);
  };

  return [value, changeValue];
}

function useStoreFormSubmitResults<T extends SerialFormInputData = SerialFormInputData>(): [
  T[],
  (value: T) => void
] {
  const dispatch = useDispatch();
  const storedValue = useSelector(selectFormSubmitResult) as T[];
  const [value, setValue] = useState(storedValue);

  const changeValue = (arg: T) => {
    setValue([...value, arg]);
    dispatch(changeFormSubmitResult(arg));
  };

  return [value, changeValue];
}

export { useStoreSearchQuery, useStoreSearchResult, useStoreFormSubmitResults };
