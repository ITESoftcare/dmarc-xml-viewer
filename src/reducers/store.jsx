import React, { createContext, useReducer } from 'react';
// import { setThemeMode } from '../utils/StorageUtil';
// import { setTheme } from './CookieUtil';

const initialState = {
  themeMode: 0,
  files: [],
  isFilesProcessing: false,
  selectedFile: null,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'STORE_FILES': {
        return {
          ...state,
          files: [...state.files, action.payload],
        };
      }
      case 'SET_IS_FILES_PROCESSING': {
        // setThemeMode(action.payload);
        return {
          ...state,
          isFilesProcessing: action.payload,
        };
      }
      case 'SET_SELECTED_FILE': {
        return {
          ...state,
          selectedFile: action.payload,
        };
      }
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
