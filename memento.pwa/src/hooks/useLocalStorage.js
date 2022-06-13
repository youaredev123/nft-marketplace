import { useState } from "react";
import _ from "lodash";

export function useLocalStorage(key, initialValue, useSession = false) {
  const storage = useSession ? window.sessionStorage : window.localStorage;
  const getValue = () => {
    // Get from local storage by key
    const item = storage.getItem(key);
    if (!item) {
      return initialValue;
    }
    try {
      const valueAsJson = JSON.parse(item);
      return valueAsJson;
    } catch (error) {
      return item;
    }
  };
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(getValue);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to/remove from the storage
      if (valueToStore === initialValue) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  };

  const removeValue = (itemName) => {
    storage.removeItem(itemName)
  }

  const hydrateValue = () => {
    const newValue = getValue();
    if (!_.isEqual(storedValue, newValue)) {
      setStoredValue(newValue);
    }
  };

  return [storedValue, setValue, hydrateValue, removeValue];
}
