import { debug as Debug } from '../debug';
import { ApplicationState } from '../initialization';
import { nameofFactory } from '../shared';
import { appBootup } from './actions';
import { BootUpProgressEnum, BootUpStatus } from './types';

const debug = Debug('app:reducer:bootup');

interface AppBootupAction {
  type: string;
}

type AppBootupSucessAction = AppBootupAction;
interface AppBootupFailAction {
  type: string;
  payload?: string;
}

type BootUpActionTypes = AppBootupAction | AppBootupSucessAction | AppBootupFailAction;

const bootUpReducer = (state: BootUpStatus = new BootUpStatus(), action: BootUpActionTypes): BootUpStatus => {
  debug('Perform reducer', state, action);
  switch (action.type) {
    case `${appBootup.start}`:
      return state.progress !== BootUpProgressEnum.Pending
        ? { ...state, progress: BootUpProgressEnum.Pending, error: undefined }
        : state;

    case `${appBootup.done}`:
      return state.progress !== BootUpProgressEnum.Done
        ? { ...state, progress: BootUpProgressEnum.Done, error: undefined }
        : state;

    case `${appBootup.fail}`:
      return { ...state, progress: BootUpProgressEnum.Fail, error: (action as AppBootupFailAction).payload };

    default:
      return state;
  }
};

const nameof = nameofFactory<ApplicationState>();

export default {
  [nameof('bootUpStatus')]: bootUpReducer
};
