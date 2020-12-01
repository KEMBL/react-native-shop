import { ProductCategoryModel } from 'rns-types';

import { debug as Debug, nameofFactory } from 'rns-packages/src/shared';
import { FailedActionResult, ExternalData } from 'rns-packages/src/shared/types';
import { fetchCategories } from './actions';
import { CategoriesCollection } from './types';

const debug = Debug('app:reducers:fetchCategory');

export interface FetchCategoriesDoneAction {
  type: string;
  payload: CategoriesCollection;
}

export interface FetchCategoriesFailAction {
  type: string;
  payload: FailedActionResult;
}

type ActionTypes = FetchCategoriesDoneAction | FetchCategoriesFailAction;

const dataReducer = (state: ProductCategoryModel[] = [], action: ActionTypes): ProductCategoryModel[] => {
  switch (action.type) {
    case `${fetchCategories.done}`: {
      return (action.payload as CategoriesCollection).categories;
    }

    case `${fetchCategories.fail}`: {
      debug('Problem with fetching all categories', (action.payload as FailedActionResult).error);
      return state;
    }

    default:
      return state;
  }
};

const branchName = 'categories';
nameofFactory<ExternalData>()(branchName);

export default {
  [branchName]: dataReducer // TODO: use slice here
};
