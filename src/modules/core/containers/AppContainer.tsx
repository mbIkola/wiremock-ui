import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContentToCurrentPaneAction, IPaneContent } from 'edikit';
import { IApplicationState } from '../../../store';
import { IData } from '../../../types';
import { loadState } from '../store';
import App from '../components/App';
import { createServer } from '../../servers';
import { defaultServers } from '../../../data';

const AppContainer: React.FC = () => {
  const dispatch = useDispatch();
  const hasBeenInitialized = useSelector(
    (state: IApplicationState) => state.core.hasBeenInitialized,
  );
  const settings = useSelector(
    (state: IApplicationState) => state.settings.settings,
  );

  const createInitialServers = () => {
    defaultServers.forEach(server => {
      dispatch(createServer(server, false));
    });
  };

  React.useEffect(() => {
    dispatch(loadState());
    createInitialServers();
  }, []);

  const addContentToCurrentPane = (content: IPaneContent<IData>) => {
    dispatch(addContentToCurrentPaneAction<IData>('default', content));
  };

  if (!hasBeenInitialized) return null;

  return (
    <App
      settings={settings}
      addContentToCurrentPane={addContentToCurrentPane}
    />
  );
};

export default AppContainer;
