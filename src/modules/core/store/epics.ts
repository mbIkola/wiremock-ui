import { Epic, combineEpics, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { initSettings } from '../../settings';
import { initServers } from '../../servers';
import { IAction } from '../../../store';
import { loadState, loadStateFinished } from './actions';
import { CoreActionTypes } from './types';

export const loadStateEpic: Epic<IAction, any> = action$ =>
  action$.pipe(
    ofType(CoreActionTypes.LOAD_STATE),
    mergeMap((_action: typeof loadState) => {
      const theme = localStorage.getItem('theme') || 'solarized dark';
      const actions: IAction[] = [
        initSettings({
          theme,
        }),
      ];

      let servers: any = localStorage.getItem('servers');
      if (servers) {
        servers = JSON.parse(servers);
        actions.push(initServers(servers));
      }

      return from([...actions, loadStateFinished()]);
    }),
  );

export const coreEpic = combineEpics(loadStateEpic);
