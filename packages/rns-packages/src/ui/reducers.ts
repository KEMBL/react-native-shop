import { actionSetCurrentCategory } from '.';
import { debug as Debug } from '../debug';
import { CategoryId } from '../product-category';
import { uiStateBranchName } from './selectors';
import { UiState } from './types';

const debug = Debug('app:reducers:setCurrentCategory');

interface SetCurrentCategory {
  type: string;
  payload: CategoryId;
}

type ActionTypes = SetCurrentCategory;

const dataReducer = (state: UiState = new UiState(), action: ActionTypes): UiState => {
  debug('UI Reducer after current category is set', action);
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
