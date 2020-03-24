import {Set as ImmSet, Record} from 'immutable';

import {ProductModel} from './ProductModels';

export interface ProductsStateInterface {
  products: ImmSet<ProductModel>;
  productsLoading: boolean;
  productsLoadingError?: string;
}

const productStateDefaults: ProductsStateInterface = {
  products: ImmSet(),
  productsLoading: false,
  productsLoadingError: undefined
};

// Record allows to have default values for our state
export class ProductsState extends Record(productStateDefaults) {}
