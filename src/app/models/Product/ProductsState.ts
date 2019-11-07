import {Record} from 'immutable';

import {ProductModel} from './ProductModels';

interface ProductsStateInterface {
  products: ProductModel[];
  productsLoading: boolean;
  productsLoadingError?: string;
}

const productStateDefaults: ProductsStateInterface = {
  products: new Array<ProductModel>(),
  productsLoading: false,
  productsLoadingError: undefined
};

export class ProductsState extends Record<ProductsStateInterface>(
  productStateDefaults
) {}
