import { ApplicationState } from '../initialization';
import { nameofFactory } from '../shared';
import { appBootup } from './actions';
import { BootUpProgressEnum, BootUpStatus } from './types';

interface AppBootupAction {
  type: string;
  payload: undefined;
}

type AppBootupSucessAction = AppBootupAction;
interface AppBootupFailAction {
  type: string;
  payload?: string;
}

type BootUpActionTypes = AppBootupAction | AppBootupSucessAction | AppBootupFailAction;

const bootUpReducer = (state: BootUpStatus = new BootUpStatus(), action: BootUpActionTypes): BootUpStatus => {
  switch (action.type) {
    case `${appBootup.start}`:
      return { ...state, progress: BootUpProgressEnum.Pending, error: undefined };

    case `${appBootup.done}`:
      return { ...state, progress: BootUpProgressEnum.Success, error: undefined };

    case `${appBootup.fail}`:
      return { ...state, progress: BootUpProgressEnum.Fail, error: action.payload };

    default:
      return {
        ...state,
        progress: BootUpProgressEnum.Fail,
        error: `Unknown action type: ${action.type}, payload: ${action.payload}`
      };
  }
};

const nameof = nameofFactory<ApplicationState>();

export default {
  [nameof('bootUpStatus')]: bootUpReducer
};
