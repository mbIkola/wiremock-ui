import * as React from 'react';
import { IPane, IPaneContent, IContentType, PaneSplitAxis } from '../types';
import Pane from './Pane';
import { Container } from './PaneManager_styled';

export interface IPaneManagerProps<Data> {
  namespace: string;
  root?: IPane<Data>;
  panes: Array<IPane<Data>>;
  contentTypes: Array<IContentType<Data>>;
  init: () => void;
  setCurrentPane: (paneId: string) => void;
  addContentToCurrentPane: (content: IPaneContent<Data>) => void;
  setPaneCurrentContent: (paneId: string, contentId: string) => void;
  removePaneContent: (paneId: string, contentId: string) => void;
  splitPane: (paneId: string, axis: PaneSplitAxis) => void;
}

const PaneManager = <Data,>({
  root,
  panes,
  contentTypes,
  init,
  setCurrentPane,
  setPaneCurrentContent,
  removePaneContent,
  splitPane,
}: IPaneManagerProps<Data>): React.ReactElement | null => {
  React.useEffect(() => {
    init();
  }, []);

  if (root === undefined) return null;

  return (
    <Container>
      <Pane
        pane={root}
        panes={panes}
        contentTypes={contentTypes}
        setCurrentPane={setCurrentPane}
        setPaneCurrentContent={setPaneCurrentContent}
        removePaneContent={removePaneContent}
        splitPane={splitPane}
      />
    </Container>
  );
};

export default PaneManager;
