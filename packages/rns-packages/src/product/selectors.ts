import { createSelector } from 'reselect';

import { CategoryId, ProductId, ProductModel } from 'rns-types';
import { ApplicationState } from 'rns-packages/src/shared/types';
import { ParametrizedSelector, proxyParam } from 'rns-packages/src/shared';
import { selectCurrentProductId } from 'rns-packages/src/ui';
import { notFoundProduct } from './default';

const selectAllProducts = (state: ApplicationState): ProductModel[] => state.externalData.products;
const selectProductById = (state: ApplicationState, id: ProductId): ProductModel | undefined =>
  selectAllProducts(state).find((p) => p.id === id);
const selectProductsByCategoryId = (): ParametrizedSelector<ProductId, ProductModel[]> =>
  createSelector(proxyParam, selectAllProducts, (categoryId: CategoryId, products) =>
    products.filter((p) => p && p.categoryId === categoryId)
  );

/**
 * Returns currently selected in UI product
 *
 * @returns selected in UI product
 */
export const selectCurrentProduct = createSelector(
  selectCurrentProductId,
  selectAllProducts,
  (currentProductId: ProductId, products) => products.find((p) => p && p.id === currentProductId) ?? notFoundProduct
);

export const selectors = {
  selectProductById,
  selectCurrentProduct,
  selectAllProducts,
  selectProductsByCategoryId
};
