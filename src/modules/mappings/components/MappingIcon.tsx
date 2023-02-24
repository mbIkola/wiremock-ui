import * as React from 'react';
import styled from 'styled-components';

const Icon = styled.div`
  color: ${props => props.theme.colors.accent};
  font-weight: 900;
  font-size: 11px;
`;

const MappingIcon: React.FC = () => {
  return <Icon>M</Icon>;
};

export default MappingIcon;
