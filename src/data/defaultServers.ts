import { IServer } from '../modules/servers';

export const defaultServers: Pick<IServer, 'name' | 'url' | 'port'>[] = [
  {
    name: 'Node Server Test',
    url: 'http://localhost',
    port: 8081,
  },
];
