import { configureStore, Store } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { notificationsMiddleware } from 'edikit';
import { IApplicationState, rootReducer, rootEpic } from './store';

export default (): Store<IApplicationState> => {
  const epicMiddleware = createEpicMiddleware();

  const middlewares = [epicMiddleware, notificationsMiddleware];

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      if (!middlewares) return getDefaultMiddleware();
      return getDefaultMiddleware().concat(...middlewares);
    },
  });

  epicMiddleware.run(rootEpic);

  return store;
};
