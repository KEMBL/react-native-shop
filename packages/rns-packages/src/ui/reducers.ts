import { CategoryId } from 'rns-packages/src/shared/types';
import { actionSetCurrentCategory } from './actions';
import { uiStateBranchName } from './selectors';
import { UiState } from './types';

interface SetCurrentCategory {
  type: string;
  payload: CategoryId;
}

type ActionTypes = SetCurrentCategory;

const dataReducer = (state: UiState = new UiState(), action: ActionTypes): UiState => {
  switch (action.type) {
    case `${actionSetCurrentCategory.start}`: {
      if (state.currentCategoryId !== action.payload) {
        return { ...state, currentCategoryId: action.payload };
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
