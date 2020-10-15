import { debug as Debug } from '../debug';
import { ApplicationState } from '../initialization';
import { fetchProducts, reducers } from '../product';
import { fetchCategories, reducers as categoryReducers } from '../category';
import { FailedActionResult, nameofFactory } from '../shared';
import { appBootup } from './actions';
import { BootUpProgressEnum, BootUpStatus } from './types';

const debug = Debug('app:reducer:bootup');

interface AppBootupAction {
  type: string;
}

type AppBootupSucessAction = AppBootupAction;
interface AppBootupFailAction {
  type: string;
  payload: FailedActionResult;
}

type BootUpActionTypes =
  | AppBootupAction
  | AppBootupSucessAction
  | AppBootupFailAction
  | categoryReducers.FetchCategoriesDoneAction
  | reducers.FetchProductsDoneAction;

const bootUpReducer = (state: BootUpStatus = new BootUpStatus(), action: BootUpActionTypes): BootUpStatus => {
  debug('Perform reducer', state, action);
  switch (action.type) {
    case `${appBootup.start}`:
      return state.progress !== BootUpProgressEnum.Pending
        ? { ...state, progress: BootUpProgressEnum.Pending, error: undefined }
        : state;

    case `${fetchCategories.done}`: {
      if (state.progress === BootUpProgressEnum.Done) {
        return state;
      }

      if (state.categoriesProgress !== BootUpProgressEnum.Done) {
        state = { ...state, categoriesProgress: BootUpProgressEnum.Done };
      }

      return state.categoriesProgress === BootUpProgressEnum.Done && state.productsProgress === BootUpProgressEnum.Done
        ? { ...state, progress: BootUpProgressEnum.Done, error: undefined }
        : state;
    }

    case `${fetchProducts.done}`: {
      if (state.progress === BootUpProgressEnum.Done) {
        return state;
      }

      if (state.productsProgress !== BootUpProgressEnum.Done) {
        state = { ...state, productsProgress: BootUpProgressEnum.Done };
      }

      return state.categoriesProgress === BootUpProgressEnum.Done && state.productsProgress === BootUpProgressEnum.Done
        ? { ...state, progress: BootUpProgressEnum.Done, error: undefined }
        : state;
    }

    case `${appBootup.fail}`:
      return { ...state, progress: BootUpProgressEnum.Fail, error: (action as AppBootupFailAction).payload.error };

    default:
      return state;
  }
};

const nameof = nameofFactory<ApplicationState>();

export default {
  [nameof('bootUpStatus')]: bootUpReducer
};
