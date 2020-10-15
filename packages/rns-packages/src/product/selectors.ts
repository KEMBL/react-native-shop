import { createSelector } from 'reselect';

import { ApplicationState, ParametrizedSelector, proxyParam } from '../initialization';
import { CategoryId } from '../category';
import { ProductId, ProductModel } from './types';

const getAllProducts = (state: ApplicationState): ProductModel[] => state.externalData.products;
//const getProductById = (state: ApplicationState, id: ProductId): ProductModel => getAllProducts(state)[id];
// const getProductsByCategoryId = (state: ApplicationState, id: ProductId): ProductModel[] =>
//   getAllProducts(state).filter((p) => p.categoryId === id);

// export const selectProductById = (): ParametrizedSelector<ProductId, ProductModel | undefined> =>
//   createSelector(proxyParam, getAllProducts, (productId: ProductId, products) =>
//     products.find((p) => p && p.id === productId)
//   );

const selectProductsByCategoryId = (): ParametrizedSelector<ProductId, ProductModel[]> =>
  createSelector(proxyParam, getAllProducts, (categoryId: CategoryId, products) =>
    products.filter((p) => p && p.categoryId === categoryId)
  );

/**
 * Returns products in the current category
 *
 * @returns {Array} products
 */
// export const selectCurrentCategoryProducts = (): ParametrizedSelector<ProductId, ProductModel[]> =>
//   createSelector(selectCurrentCategoryId, getAllProducts, (currentCategoryId: CategoryId, products) =>
//     products.filter((p) => p && p.categoryId === currentCategoryId)
//   );

export const selectors = {
  getAllProducts,
  selectProductsByCategoryId
};
