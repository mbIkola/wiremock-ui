import * as React from 'react';
import PaneHeaderButton from './PaneHeaderButton';
import SplitPaneIcon from './SplitPaneIcon';
import { Container, Buttons, SplitButtons } from './PaneHeader_styled';
import { IPane, IContentType, PaneSplitAxis } from '../types';

export interface IPaneHeaderProps<ContentData> {
  contentTypes: Array<IContentType<ContentData>>;
  pane: IPane<ContentData>;
  setCurrentContent: (contentId: string) => void;
  removeContent: (contentId: string) => void;
  splitPane: (axis: PaneSplitAxis) => void;
}

const PaneHeader = <ContentData,>({
  pane,
  contentTypes,
  setCurrentContent,
  removeContent,
  splitPane,
}: IPaneHeaderProps<ContentData>): React.ReactElement => {
  const splitHorizontally = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    splitPane(PaneSplitAxis.Horizontal);
  };

  const splitVertically = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    splitPane(PaneSplitAxis.Vertical);
  };

  return (
    <Container>
      <Buttons>
        {pane.contents.map(content => (
          <PaneHeaderButton
            key={content.id}
            pane={pane}
            content={content}
            contentTypes={contentTypes}
            setCurrentContent={setCurrentContent}
            removeContent={removeContent}
          />
        ))}
      </Buttons>
      {pane.contents.length > 0 && (
        <SplitButtons>
          <SplitPaneIcon axis="horizontal" onClick={splitHorizontally} />
          <SplitPaneIcon axis="vertical" onClick={splitVertically} />
        </SplitButtons>
      )}
    </Container>
  );
};

export default PaneHeader;
