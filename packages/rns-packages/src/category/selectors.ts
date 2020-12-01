import { createSelector } from 'reselect';
import { CategoryId, ProductCategoryModel, ProductCategoryModelWithProducts, ProductId, ProductModel } from 'rns-types';

import { selectState, ParametrizedSelector, proxyParam } from 'rns-packages/src/shared';
import { Probability, ApplicationState } from 'rns-packages/src/shared/types';
import { selectors as productSelectors } from 'rns-packages/src/product';
import { selectCurrentCategoryId } from 'rns-packages/src/ui';

const selectAllCategories = (state: ApplicationState): ProductCategoryModel[] => state.externalData.categories;
const selectCategoryById = (state: ApplicationState, { id = 0 }: { id: CategoryId }): ProductCategoryModel =>
  state.externalData.categories[id];

export const selectCurrentCategoryCategoriesOld = createSelector(
  selectCurrentCategoryId,
  selectAllCategories,
  productSelectors.selectAllProducts,
  (currentCategoryId, categories, products) => {
    const subCategories: ProductCategoryModelWithProducts[] = [];
    for (const category of categories) {
      if (!category || category.parentId !== currentCategoryId) {
        continue;
      }

      const subCategory: ProductCategoryModelWithProducts = {
        id: category.id,
        parentId: category.parentId,
        title: category.title
      };

      subCategory.products = products.filter((p) => !!p && p.categoryId === category.id);
      subCategories.push(subCategory);
    }

    return subCategories;
  }
);

/**
 * All categories inside given one as a numbers array
 *
 * @returns {Array} all subb categories deep
 */
const selectSubCategoriesFlatTree = (): ParametrizedSelector<CategoryId, number[]> =>
  createSelector(proxyParam, selectAllCategories, selectState, (categoryId, categories, state) => {
    const subCategories: number[] = [];
    for (const category of categories) {
      if (!category || category.parentId !== categoryId) {
        continue;
      }

      subCategories.push(category.id);
      subCategories.push(...selectSubCategoriesFlatTree()(state, category.id)); // RECURSION!go deeper
    }
    return subCategories;
  });

interface DeepProductsRequest {
  categoryId: CategoryId;
  amount: number;
}

/**
 * Search products in categories deep and return last 20
 *
 * @returns {Array} found products
 */
const selectCategoryProductsDeep = (): ParametrizedSelector<DeepProductsRequest, ProductModel[]> =>
  createSelector(
    proxyParam,
    selectState,
    productSelectors.selectAllProducts,
    (parameters: DeepProductsRequest, state, productsSelector) => {
      const { categoryId, amount } = parameters;

      // 1. select all sub products: build category flat tree, select sub products
      const categoriesFlatTree = selectSubCategoriesFlatTree()(state, categoryId);
      // console.log('selectCategoryProductsDeep', categoryId, amount, categoriesFlatTree);
      // 2. get all products with category from the categories flat tree
      const products: ProductModel[] = productsSelector.filter((p) => categoriesFlatTree.includes(p.categoryId));

      // 3. Select random products (no other criteria here, might be rationg?)
      // random seed should be linked somehow to user / time othervice products will change to often
      // lets say random products should not be canged during last 5 minutes, but this better to perfrom through that selector memoization

      return (
        products
          .map<Probability<ProductId>>((p) => {
            return { id: p.id, probability: Math.random() };
          }) // add random num to each product
          .sort((p1, p2) => p1.probability - p2.probability) // sort products by random param (order does not matter here)
          .slice(0, amount) // select first X elemets
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          .map((p) => productSelectors.selectProductById(state, p.id)!)
      ); // convert back po rpoducts
    }
  );

const MIN_PRODUCTS_TO_RETURN = 10;

/**
 * Returns given category with products, if no products they will be selected in-deep from sub categories
 *
 * @returns {Array} found categories
 */
export const selectCategoryCategories = (): ParametrizedSelector<CategoryId, ProductCategoryModelWithProducts[]> =>
  createSelector(proxyParam, selectAllCategories, selectState, (categoryId, categories, state) => {
    const subCategories: ProductCategoryModelWithProducts[] = [];
    for (const category of categories) {
      if (!category || category.parentId !== categoryId) {
        continue;
      }

      const subCategory: ProductCategoryModelWithProducts = {
        id: category.id,
        parentId: category.parentId,
        title: category.title
      };

      subCategory.products = productSelectors.selectProductsByCategoryId()(state, category.id);
      const productsCount = subCategory.products.length;
      if (productsCount < MIN_PRODUCTS_TO_RETURN) {
        subCategory.products.push(
          ...selectCategoryProductsDeep()(state, {
            categoryId: category.id,
            amount: MIN_PRODUCTS_TO_RETURN - productsCount
          })
        );
      }
      subCategories.push(subCategory);
    }

    return subCategories;
  });

/**
 * Returns current category with products, if no products they will be selected in-deep from sub categories
 *
 * @returns {Array} found categories with products
 */
export const selectCurrentCategoryCategories = createSelector(
  (state: ApplicationState) => selectState(state), // anonymous function that calls input-selector.
  (state) => {
    // ?? more https://github.com/reduxjs/reselect/issues/169#issuecomment-675021575
    return selectCategoryCategories()(state, selectCurrentCategoryId(state));
  }
);

export const selectors = { selectCategoryById, selectCurrentCategoryCategories };
