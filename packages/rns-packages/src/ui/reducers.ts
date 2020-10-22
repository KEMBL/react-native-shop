import { ProductId } from 'rns-types';

import { CategoryId } from 'rns-packages/src/shared/types';
import { actionSetCurrentCategory, actionSetCurrentProduct } from './actions';
import { uiStateBranchName } from './selectors';
import { UiState } from './types';

interface SetCurrentCategory {
  type: string;
  payload: CategoryId;
}

interface SetCurrentProduct {
  type: string;
  payload: ProductId;
}

type ActionTypes = SetCurrentCategory | SetCurrentProduct;

const dataReducer = (state: UiState = new UiState(), action: ActionTypes): UiState => {
  switch (action.type) {
    case `${actionSetCurrentCategory.start}`: {
      if (state.currentCategoryId !== action.payload) {
        return { ...state, currentCategoryId: action.payload };
      }
      return state;
    }

    case `${actionSetCurrentProduct.start}`: {
      if (state.currentProductId !== action.payload) {
        return { ...state, currentProductId: action.payload };
      }
      return state;
    }

    default:
      return state;
  }
};

export default {
  [uiStateBranchName]: dataReducer
};
