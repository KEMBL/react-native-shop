import { createSelector } from 'reselect';

import { ApplicationState, ParametrizedSelector, proxyParam } from '../initialization';
import { nameofFactory } from '../shared';
import { CategoryId } from '../product-category';
import { selectors as uiSelectors } from '../ui';
import { ProductId, ProductModel } from './types';

export const externalDataBranchName = 'externalData';
nameofFactory<ApplicationState>()(externalDataBranchName); // name guard

const getAllProducts = (state: ApplicationState): ProductModel[] => state.externalData.products;
//const getProductById = (state: ApplicationState, id: ProductId): ProductModel => getAllProducts(state)[id];
// const getProductsByCategoryId = (state: ApplicationState, id: ProductId): ProductModel[] =>
//   getAllProducts(state).filter((p) => p.categoryId === id);

export const selectProductById = (): ParametrizedSelector<ProductId, ProductModel | undefined> =>
  createSelector(proxyParam, getAllProducts, (productId: ProductId, products) =>
    products.find((p) => p.id === productId)
  );

export const selectProductsByCategoryId = (): ParametrizedSelector<ProductId, ProductModel[]> =>
  createSelector(proxyParam, getAllProducts, (categoryId: CategoryId, products) =>
    products.filter((p) => p.categoryId === categoryId)
  );

/**
 * Returns products in the current category
 *
 * @returns {Array} products
 */
export const selectCurrentCategoryProducts = (): ParametrizedSelector<ProductId, ProductModel[]> =>
  createSelector(uiSelectors.selectCurrentCategory, getAllProducts, (currentCategoryId: CategoryId, products) =>
    products.filter((p) => p.categoryId === currentCategoryId)
  );

export const selectors = {
  getAllProducts,
  selectProductById,
  selectProductsByCategoryId,
  selectCurrentCategoryProducts
};
