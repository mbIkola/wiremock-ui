import * as React from 'react';
import { useSelector } from 'react-redux';
import Notifications from '../components/Notifications';
import { IApplicationState } from '../../../store';

const NotificationsContainer: React.FC = () => {
  const notifications = useSelector(
    (state: IApplicationState) => state.notifications,
  );

  return <Notifications notifications={notifications} />;
};

export default NotificationsContainer;
