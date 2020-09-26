import { Record } from 'immutable';

import { ProductsState } from '../Product/ProductsState';

export interface ApplicationStateInterface {
  productsState: ProductsState;
}

const appStateDefaults: ApplicationStateInterface = {
  productsState: new ProductsState()
};

export class ApplicationState extends Record(appStateDefaults) {}
