import Debug from 'debug';

import { CategoryId } from 'product-category';
import { uiStateBranchName } from './selectors';
import { UiState } from './types';

const debug = Debug('app:reducers:setCurrentCategory');

interface SetCurrentCategory {
  type: string;
  payload: CategoryId;
}

const dataReducer = (state: UiState, action: SetCurrentCategory): UiState => {
  debug('Reducer after fetching categories with products', action);

  return { ...state, currentCategory: action.payload };
};

export default {
  [uiStateBranchName]: dataReducer
};
