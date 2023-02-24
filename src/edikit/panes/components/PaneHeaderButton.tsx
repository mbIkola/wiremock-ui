import * as React from 'react';
import { X as RemoveIcon } from 'react-feather';
import { IContentType, IPane, IPaneContent } from '../types';
import { Container, Label, RemoveButton } from './PaneHeaderButton_styled';

export interface IPaneHeaderButtonProps<ContentData> {
  pane: IPane<ContentData>;
  contentTypes: Array<IContentType<ContentData>>;
  content: IPaneContent<ContentData>;
  setCurrentContent: (contentId: string) => void;
  removeContent: (contentId: string) => void;
}

const PaneHeaderButton = <ContentData,>({
  pane,
  content,
  contentTypes,
  removeContent,
  setCurrentContent,
}: IPaneHeaderButtonProps<ContentData>): React.ReactElement => {
  const handleOpen = (e: React.SyntheticEvent) => {
    // prevents setCurrentPane
    e.stopPropagation();

    setCurrentContent(content.id);
  };

  const handleRemove = (e: React.SyntheticEvent) => {
    // prevents setCurrentPane
    e.stopPropagation();

    removeContent(content.id);
  };

  const contentType = contentTypes.find(ct => ct.id === content.type);
  if (contentType === undefined) {
    throw new Error(
      `unsupported content type: ${content.type}\n${JSON.stringify(content)}`,
    );
  }

  const renderContext = {
    content,
    pane,
    extra: {
      close: () => {
        removeContent(content.id);
      },
    },
  };

  const label = contentType.renderButton(renderContext);
  const icon = contentType.renderIcon(renderContext);

  return (
    <Container isCurrent={content.isCurrent} onClick={handleOpen}>
      {icon}
      <Label>{label}</Label>
      <RemoveButton onClick={handleRemove}>
        <RemoveIcon size={13} />
      </RemoveButton>
    </Container>
  );
};

export default PaneHeaderButton;
