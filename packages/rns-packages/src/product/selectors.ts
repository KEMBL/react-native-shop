import { createSelector } from 'reselect';

import { ApplicationState, ParametrizedSelector, proxyParam } from '../initialization';
import { CategoryId } from '../category';
import { ProductId, ProductModel } from './types';

const selectAllProducts = (state: ApplicationState): ProductModel[] => state.externalData.products;
const selectProductById = (state: ApplicationState, id: ProductId): ProductModel | undefined =>
  selectAllProducts(state).find((p) => p.id === id);
// const getProductsByCategoryId = (state: ApplicationState, id: ProductId): ProductModel[] =>
//   getAllProducts(state).filter((p) => p.categoryId === id);

// export const selectProductById = (): ParametrizedSelector<ProductId, ProductModel | undefined> =>
//   createSelector(proxyParam, getAllProducts, (productId: ProductId, products) =>
//     products.find((p) => p && p.id === productId)
//   );

const selectProductsByCategoryId = (): ParametrizedSelector<ProductId, ProductModel[]> =>
  createSelector(proxyParam, selectAllProducts, (categoryId: CategoryId, products) =>
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
  selectProductById,
  selectAllProducts,
  selectProductsByCategoryId
};
