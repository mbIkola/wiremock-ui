import * as React from 'react';
import themes from '../../../themes';
import { ISettings } from '../types';
import { Container, Grid, Title, Item } from './Settings_styled';

interface ISettingsProps {
  settings: ISettings;
  setSetting: (key: string, value: any) => void;
}

const Settings: React.FC<ISettingsProps> = ({ settings, setSetting }) => {
  return (
    <Container>
      <Grid>
        <div>
          <Title>Theme</Title>
          {Object.keys(themes).map((t: string) => (
            <Item
              key={t}
              onClick={() => {
                setSetting('theme', t);
              }}
              isActive={t === settings.theme}
            >
              {t}
            </Item>
          ))}
        </div>
      </Grid>
    </Container>
  );
};

export default Settings;
