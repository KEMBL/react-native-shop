import { debug as Debug } from '../debug';
import { fetchCategories } from './actions';
import { CategoriesCollection, CategoryId, ProductCategoryCollection, ProductCategoryModel } from './types';
import { FailedActionResult, FailedActionResultWithPayload, nameofFactory } from '../shared';
import { ExternalData } from '../initialization';

const debug = Debug('app:reducers:fetchCategory');

export interface FetchCategoriesWithProductsDoneAction {
  type: string;
  payload: ProductCategoryCollection;
}

interface FetchCategoriesWithProductsFailAction {
  type: string;
  payload: FailedActionResultWithPayload<CategoryId>;
}

export interface FetchCategoriesDoneAction {
  type: string;
  payload: CategoriesCollection;
}

export interface FetchCategoriesFailAction {
  type: string;
  payload: FailedActionResult;
}

// const compareCategory = (source: ProductCategoryModel, dest: ProductCategoryModelWithProducts): boolean => {
//   return source.parentId === dest.parentId && source.title === dest.title;
// };

// const compareProduct = (source: ProductModel, dest: ProductModel): boolean => {
//   return source.name === dest.name && source.categoryId === dest.categoryId && source.editDatetime === dest.editDatetime
//   && isEqual(source.imageUrls, dest.imageUrls) && isEqual(source.price, dest.price);
// };

// /** Updates state categories and products
//  *
//  * @param {object} state current state
//  * @param {object} collection collection of categories with products
//  *
//  * @returns {object} state
//  */
// const updateCategoriesAndProducts = (
//   state: ExternalData = {} as any,
//   collection: ProductCategoryCollection
// ): ExternalData => {
//   // debug('Got collection', collection);
//   // debug('Got categories', collection.categories.length);

//   if (!collection) {
//     debug('Warning: undefined categories collection');
//     return state;
//   }

//   const categories = collection.categories;
//   if (!categories) {
//     debug('Warning: undefined categories list');
//     return state;
//   }

//   if (categories.length === 0) {
//     debug('Information: empty categories list');
//     return state;
//   }

//   // console.log('Reducer', typeof categories, Object.keys(categories).length, categories.length, categories);

//   for (const category of categories) {
//     const source = state.categories[category.id];
//     if (!source || !isEqual(source, category)) {
//       const newCategory: ProductCategoryModel = { id: category.id, parentId: category.parentId, title: category.title };
//       state.categories[category.id] = newCategory; // at this place we make id -> category relation in our state
//     }

//     if (!category.products) {
//       continue;
//     }

//     for (const product of category.products) {
//       const source = state.products[product.id];
//       if (!source || !isEqual(source, product)) {
//         state.products[product.id] = clonedeep(product); // at this place we make id -> product relation in our state
//       }
//     }
//   }

//   return state;
// };

type ActionTypes =
  // | FetchCategoriesWithProductsDoneAction
  // | FetchCategoriesWithProductsFailAction
  FetchCategoriesDoneAction | FetchCategoriesFailAction;

const dataReducer = (state: ProductCategoryModel[] = [], action: ActionTypes): ProductCategoryModel[] => {
  // debug(
  //   'Reducer after fetching categories:',
  //   action.type,
  //   `${fetchCategories.done}`,
  //   action.type === `${fetchCategories.done}`,
  //   state
  // );

  switch (action.type) {
    case `${fetchCategories.done}`: {
      return (action.payload as CategoriesCollection).categories;
    }

    case `${fetchCategories.fail}`: {
      debug('Problem with fetching all categories', (action.payload as FailedActionResult).error);
      return state;
    }

    // case `${fetchCategoriesWithProducts.done}`: {
    //   return updateCategoriesAndProducts(state, action.payload as ProductCategoryCollection);
    // }

    // case `${fetchCategoriesWithProducts.fail}`: {
    //   const payload = action.payload as FailedActionResultWithPayload<CategoryId>;
    //   debug('Problem with fetching categories with products', payload.payload, payload.error);
    //   return state;
    // }

    default:
      return state;
  }
};

const branchName = 'categories';
nameofFactory<ExternalData>()(branchName);

export default {
  [branchName]: dataReducer // TODO: use slice here
};
