import * as React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './modules/core/containers/AppContainer';
import GlobalStyles from './globalStyles';

import configureStore from './configureStore';

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <AppContainer />
    </Provider>
  );
};

export default Root;
