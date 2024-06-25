import { useCallback, useState } from "react";

export function useLocalStorageState(storageKey, initialState) {
  const [state, setState] = useState(() => {
    const fromStorage = localStorage.getItem(storageKey);
    if(fromStorage) {
      return JSON.parse(fromStorage);
    }
    let toStore = initialState;
    if(typeof initialState === 'function') {
      toStore = initialState();
    }
    localStorage.setItem(storageKey, JSON.stringify(toStore));
    return toStore;
  });

  const updateState = useCallback((newState) => {
    setState((oldState) => {
      let computedState = newState;
      if(typeof newState === 'function') {
        computedState = newState(oldState);
      }
      localStorage.setItem(storageKey, JSON.stringify(computedState));

      return computedState;
    });
  }, [storageKey]);

  return [state, updateState];
}
