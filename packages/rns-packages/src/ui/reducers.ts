import { CategoryId, ProductId } from 'rns-types';

import { ApplicationState } from 'rns-packages/src/shared/types';
import { nameofFactory } from 'rns-packages/src/shared';

import {
  actionSetCurrentCategory,
  actionSetCurrentProduct,
  actionSetDeliveryManagerClose,
  actionSetDeliveryManagerOpen
} from './actions';
import { UiState } from './types';

interface SetCurrentCategory {
  type: string;
  payload: CategoryId;
}

interface SetCurrentProduct {
  type: string;
  payload: ProductId;
}

interface SetDeliveryManagerOpen {
  type: string;
}

interface SetDeliveryManagerClose {
  type: string;
}

type ActionTypes = SetCurrentCategory | SetCurrentProduct | SetDeliveryManagerOpen | SetDeliveryManagerClose;

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

    case `${actionSetDeliveryManagerOpen.start}`: {
      if (!state.isDeliveryManagerOpened) {
        return { ...state, isDeliveryManagerOpened: true };
      }
      return state;
    }

    case `${actionSetDeliveryManagerClose.start}`: {
      if (state.isDeliveryManagerOpened) {
        return { ...state, isDeliveryManagerOpened: false };
      }
      return state;
    }

    default:
      return state;
  }
};

export const uiStateBranchName = 'uiState';
nameofFactory<ApplicationState>()(uiStateBranchName); // name guard

export default {
  [uiStateBranchName]: dataReducer
};
