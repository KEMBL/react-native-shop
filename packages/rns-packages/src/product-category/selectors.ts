import { createSelector } from 'reselect';

import { ApplicationState } from '../initialization';
import { nameofFactory } from '../shared';
import { selectors as uiSelectors } from '../ui';
import { selectors as productSelectors } from '../product';
import { CategoryId, ProductCategoryModel, ProductCategoryModelWithProducts } from './types';

export const externalDataBranchName = 'externalData';
nameofFactory<ApplicationState>()(externalDataBranchName); // name guard

const getAllCategories = (state: ApplicationState): ProductCategoryModel[] => state.externalData.categories;
const selectCategoryById = (state: ApplicationState, { id = 0 }: { id: CategoryId }): ProductCategoryModel =>
  state.externalData.categories[id];

/**
 * Returns sub categories in the current category
 *
 * @returns {Array} categories
 */
// export const selectCurrentCategoryCategories = (): ParametrizedSelector<CategoryId, ProductCategoryModel[]> =>
//   createSelector(uiSelectors.selectCurrentCategory, getAllCategories, (currentCategoryId: CategoryId, categories) =>
//     categories.filter((c) => c.parentId === currentCategoryId)
//   );

// const selectCurrentCategorySubCategories = createSelector(
//   uiSelectors.selectCurrentCategory,
//   getAllCategories,
//   (currentCategoryId: CategoryId, categories) => categories.filter((c) => c.parentId === currentCategoryId)
// );

// export const selectCurrentCategoryCategories1 = createSelector(
//   selectCurrentCategorySubCategories,
//   productSelectors.selectCurrentCategoryProducts,
//   getAllCategories,
//   productSelectors.getAllProducts,
//   (subCategories: ProductCategoryModel[], currentProducts, categories, products) =>
//     categories.filter((c) => c.parentId === currentCategoryId)
// );

export const selectCurrentCategoryCategories = createSelector(
  uiSelectors.selectCurrentCategory,
  getAllCategories,
  productSelectors.getAllProducts,
  (currentCategoryId, categories, products) => {
    const subCategories: ProductCategoryModelWithProducts[] = [];
    for (const category of categories) {
      if (category.parentId !== currentCategoryId) {
        continue;
      }

      const subCategory: ProductCategoryModelWithProducts = {
        id: category.id,
        parentId: category.parentId,
        title: category.title
      };

      subCategory.products = products.filter((p) => p.categoryId === category.id);
    }
    return subCategories;
  }
  //categories.filter((c) => c.parentId === currentCategoryId)
);

export const selectors = { selectCategoryById, selectCurrentCategoryCategories };
