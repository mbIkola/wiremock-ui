import * as React from 'react';
import { Allotment } from 'allotment';
import PaneHeader from './PaneHeader';
import EmptyPane from './EmptyPane';
import { Container, Content } from './Pane_styled';
import { IPane, IPaneContent, IContentType, PaneSplitAxis } from '../types';

export interface IPaneProps<Data> {
  pane: IPane<Data>;
  panes: Array<IPane<Data>>;
  contentTypes: Array<IContentType<Data>>;
  setCurrentPane: (paneId: string) => void;
  setPaneCurrentContent: (paneId: string, contentId: string) => void;
  removePaneContent: (paneId: string, contentId: string) => void;
  splitPane: (paneId: string, axis: PaneSplitAxis) => void;
}

const Pane = <Data,>({
  pane,
  panes,
  contentTypes,
  setCurrentPane: _setCurrentPane,
  setPaneCurrentContent,
  removePaneContent,
  splitPane: _splitPane,
}: IPaneProps<Data>): React.ReactElement => {
  const setCurrentPane = () => {
    _setCurrentPane(pane.id);
  };

  const setCurrentContent = (contentId: string) => {
    setPaneCurrentContent(pane.id, contentId);
  };

  const removeContent = (contentId: string) => {
    removePaneContent(pane.id, contentId);
  };

  const closeContent = (contentId: string) => () => {
    removeContent(contentId);
  };

  const splitPane = (axis: PaneSplitAxis) => {
    _splitPane(pane.id, axis);
  };

  if (pane.split === true) {
    return (
      <Allotment vertical={pane.splitAxis === PaneSplitAxis.Horizontal}>
        <Allotment.Pane preferredSize="50%">
          {pane.children.map(childPaneId => {
            const childPane = panes.find(p => p.id === childPaneId);
            if (childPane === undefined) {
              throw new Error(
                `no pane found for id: ${childPaneId}\n${JSON.stringify(pane)}`,
              );
            }

            return (
              <Pane
                key={childPaneId}
                pane={childPane}
                panes={panes}
                contentTypes={contentTypes}
                setCurrentPane={setCurrentPane}
                setPaneCurrentContent={setPaneCurrentContent}
                removePaneContent={removePaneContent}
                splitPane={splitPane}
              />
            );
          })}
        </Allotment.Pane>
      </Allotment>
    );
  }

  let contents: Array<IPaneContent<Data>> = [];
  let content;
  if (pane !== undefined) {
    contents = pane.contents;
    content = contents.find(c => c.isCurrent);
  }

  if (content === undefined) return <EmptyPane />;

  const foundContent = content as IPaneContent<Data>;
  const contentType = contentTypes.find(ct => ct.id === foundContent.type);
  if (contentType === undefined) {
    throw new Error(
      `unsupported content type: ${foundContent.type}\n${JSON.stringify(
        foundContent,
      )}`,
    );
  }

  return (
    <Container isCurrent={pane.isCurrent} onClick={setCurrentPane}>
      <PaneHeader
        contentTypes={contentTypes}
        pane={pane}
        setCurrentContent={setCurrentContent}
        removeContent={removeContent}
        splitPane={splitPane}
      />
      <Content>
        {contentType.renderPane({
          content: foundContent,
          pane,
          extra: {
            close: closeContent(content.id),
          },
        })}
      </Content>
    </Container>
  );
};

export default Pane;
