import { ProductModel } from './product';

export type NavigationStackParamList = {
  Loading: { isError: boolean };
  ProductsListScreen: { products: ProductModel[] };
  ProductPage: { products: ProductModel[] };
  DeliveryManager: undefined;
};
