import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createServer as createServerAction } from '../store';
import CreateServer, { ICreateServerProps } from '../components/CreateServer';
import { IServer } from '../types';

const CreateServerContainer: React.FC<
  Pick<ICreateServerProps, 'close'>
> = props => {
  const dispatch = useDispatch();

  const createServer = (server: Pick<IServer, 'name' | 'url' | 'port'>) => {
    dispatch(createServerAction(server));
  };

  return <CreateServer {...props} createServer={createServer} />;
};

export default CreateServerContainer;
