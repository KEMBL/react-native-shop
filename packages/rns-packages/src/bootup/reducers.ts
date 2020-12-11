import { debug as Debug, nameofFactory } from 'rns-packages/src/shared';
import { FailedActionResult } from 'rns-packages/src/shared/types';
import { ApplicationState } from 'rns-packages/src/initialization';
import { fetchProducts, FetchProductsDoneAction } from 'rns-packages/src/product';
import { fetchCategories, FetchCategoriesDoneAction } from 'rns-packages/src/category';
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
  | FetchCategoriesDoneAction
  | FetchProductsDoneAction;

const bootUpReducer = (state: BootUpStatus = new BootUpStatus(), action: BootUpActionTypes): BootUpStatus => {
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
      debug('Failed action', action);
      return { ...state, progress: BootUpProgressEnum.Fail, error: (action as AppBootupFailAction).payload.error };

    default:
      return state;
  }
};

const bootUpStatusBranchName = 'bootUpStatus';
nameofFactory<ApplicationState>()(bootUpStatusBranchName);

export default {
  [bootUpStatusBranchName]: bootUpReducer
};
