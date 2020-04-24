import {ProductModel} from '../Product/ProductModels';

// tslint:disable-next-line:interface-over-type-literal
export type NavigationStackParamList = {
  Loading: {isError: boolean};
  MainScreen: {products: ProductModel[]};
  ProductPage: {products: ProductModel[]};
};
