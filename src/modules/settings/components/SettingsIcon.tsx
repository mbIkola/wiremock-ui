import * as React from 'react';
import { withTheme } from 'styled-components';
import { Settings as Icon } from 'react-feather';

export interface ISettingsIconProps {
  theme: any;
}

const SettingsIcon: React.FC<ISettingsIconProps> = ({ theme }) => {
  return <Icon size={12} color={theme.colors.accent} />;
};

export default withTheme(SettingsIcon);
