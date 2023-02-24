import * as React from 'react';
import { withTheme } from 'styled-components';
import { Container, Block } from './EmptyPane_styled';
import { ITheme } from '../../theming';

export interface IEmptyPaneProps {
  theme: ITheme;
}

const EmptyPane: React.FC<IEmptyPaneProps> = () => {
  return (
    <Container>
      <Block />
    </Container>
  );
};

export default withTheme(EmptyPane);
