import * as React from 'react';
import { Allotment } from 'allotment';
import { ThemeProvider } from 'styled-components';
import {
  createPaneManager,
  IPaneContent,
  NotificationsContainer,
} from 'edikit';
import themes from '../../../themes';
import { ISettings, settingsContentTypes } from '../../settings';
import { serversContentTypes } from '../../servers';
import { mappingsContentTypes } from '../../mappings';
import ExplorerContainer from '../containers/ExplorerContainer';
import AppBar from './AppBar';
import { Container, Inner } from './App_styled';
import { IApplicationState } from '../../../store';
import { IData } from '../../../types';

const PaneManager = createPaneManager<IApplicationState, IData>({
  namespace: 'default',
  contentTypes: [
    ...settingsContentTypes,
    ...serversContentTypes,
    ...mappingsContentTypes,
  ],
});

export interface IAppProps {
  settings: ISettings;
  addContentToCurrentPane(content: IPaneContent<IData>): void;
}

const App: React.FC<IAppProps> = ({ settings, addContentToCurrentPane }) => {
  return (
    <ThemeProvider theme={themes[settings.theme]}>
      <Container>
        <AppBar addContentToCurrentPane={addContentToCurrentPane} />
        <Inner>
          <Allotment>
            <Allotment.Pane preferredSize={260}>
              <ExplorerContainer
                addContentToCurrentPane={addContentToCurrentPane}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <PaneManager />
            </Allotment.Pane>
          </Allotment>
        </Inner>
        <NotificationsContainer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
