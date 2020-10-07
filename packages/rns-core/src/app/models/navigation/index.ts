import { ProductModel } from 'rns-packages';

export type NavigationStackParamList = {
  Loading: { isError: boolean };
  ProductsListScreen: { products: ProductModel[] };
  ProductPage: { products: ProductModel[] };
};
