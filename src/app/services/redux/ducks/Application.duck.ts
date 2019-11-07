import {Reducer} from 'react';
import {AnyAction} from 'redux';

import {ApplicationState} from '../../../models/Application/ApplicationState';

export const INIT_STATE = 'app/INIT_STATE';

interface InitStateAction extends AnyAction {
  type: typeof INIT_STATE;
}

export type ApplicationActionTypes = InitStateAction;

const reducer: Reducer<ApplicationState, ApplicationActionTypes> = (
  state,
  action
) => {
  switch (action.type) {
    case INIT_STATE:
      return new ApplicationState();
    default:
      return state;
  }
};

export {reducer as ApplicationStateReducer};
