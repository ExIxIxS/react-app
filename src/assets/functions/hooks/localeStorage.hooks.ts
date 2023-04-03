import { useState, useEffect, useRef } from 'react';

function useLocalStorage(key: string, initialValue: string): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ?? initialValue;
  });

  const valueRef = useRef<string>(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    return () => {
      localStorage.setItem(key, valueRef.current);
    };
  }, [key]);

  return [value, setValue];
}

export { useLocalStorage };
