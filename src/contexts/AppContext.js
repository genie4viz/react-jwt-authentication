import React, { createContext, useReducer } from 'react';

const AppContext = createContext(null);
const initAppStore = {
  receivedToken: null
};
const appReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_RECEIVEDTOKEN':
      return { receivedToken: action.value };
    default:
      throw new Error('Unexpected action');
  }
};

const AppProvider = props => {
  const [store, dispatch] = useReducer(appReducer, initAppStore);
  return <AppContext.Provider value={{ store, dispatch }}>{props.children}</AppContext.Provider>;
};
export { AppContext, AppProvider };
