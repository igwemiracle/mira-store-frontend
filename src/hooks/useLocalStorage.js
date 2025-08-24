import React, { useState, useEffect } from "react";

function getSavedValue(key, initialValue) {
  try {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) return JSON.parse(savedValue);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
  }

  return typeof initialValue === 'function' ? initialValue() : initialValue;
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
