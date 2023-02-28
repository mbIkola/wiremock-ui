import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSetting as setSettingsAction } from '../store';
import { IApplicationState } from '../../../store';
import Settings from '../components/Settings';

const SettingsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector(
    (state: IApplicationState) => state.settings.settings,
  );

  const setSetting = (key: string, value: any) => {
    dispatch(setSettingsAction()(key, value));
  };

  return <Settings settings={settings} setSetting={setSetting} />;
};

export default SettingsContainer;
