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
  debug('Reducer after fetching categories with products', action);

  return { ...state, currentCategory: action.payload };
};

export default {
  [uiStateBranchName]: dataReducer
};
