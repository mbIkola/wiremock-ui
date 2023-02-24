import * as React from 'react';
import { Container, Icon, Part, Line } from './SplitPaneIcon_styled';

export interface ISplitPaneIconProps {
  axis: 'horizontal' | 'vertical';
  onClick: React.MouseEventHandler;
}

const SplitPaneIcon: React.FC<ISplitPaneIconProps> = props => {
  return (
    <Container {...props}>
      <Icon axis={props.axis}>
        <Part side="left" />
        <Line />
        <Part side="right" />
      </Icon>
    </Container>
  );
};

export default SplitPaneIcon;
