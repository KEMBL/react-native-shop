import { ApplicationState } from 'initialization';
import { nameofFactory } from 'shared';
import { appBootup, appBootupComplete, appBootupCompleteFail } from './actions';
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

const bootUpReducer = (state: BootUpStatus, action: BootUpActionTypes): BootUpStatus => {
  switch (action.type) {
    case `${appBootup}`:
      return { ...state, progress: BootUpProgressEnum.Pending, error: undefined };

    case `${appBootupComplete}`:
      return { ...state, progress: BootUpProgressEnum.Success, error: undefined };

    case `${appBootupCompleteFail}`:
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
