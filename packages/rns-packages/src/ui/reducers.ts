import { ProductId } from 'rns-types';

import { CategoryId } from 'rns-packages/src/shared/types';
import { actionSetCurrentCategory, actionSetCurrentProduct, actionSetDeliveryManagerOpened } from './actions';
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

interface SetDeliveryManagerOpened {
  type: string;
}

type ActionTypes = SetCurrentCategory | SetCurrentProduct | SetDeliveryManagerOpened;

const dataReducer = (state: UiState = new UiState(), action: ActionTypes): UiState => {
  switch (action.type) {
    case `${actionSetCurrentCategory.start}`: {
      const myAction = action as SetCurrentCategory;
      if (state.currentCategoryId !== myAction.payload) {
        return { ...state, currentCategoryId: myAction.payload };
      }
      return state;
    }

    case `${actionSetCurrentProduct.start}`: {
      const myAction = action as SetCurrentProduct;
      if (state.currentProductId !== myAction.payload) {
        return { ...state, currentProductId: myAction.payload };
      }
      return state;
    }

    case `${actionSetDeliveryManagerOpened.start}`: {
      if (!state.isDeliveryManagerOpened) {
        return { ...state, isDeliveryManagerOpened: true };
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
