import { ProductModel } from '../';

// tslint:disable-next-line:interface-over-type-literal
export type NavigationStackParamList = {
  Loading: { isError: boolean };
  ProductsListScreen: { products: ProductModel[] };
  ProductPage: { products: ProductModel[] };
};
