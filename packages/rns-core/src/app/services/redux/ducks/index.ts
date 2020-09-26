import { combineReducers } from 'redux';

import { ProductStateReducer } from './Products.duck';

const rootReducer = combineReducers({
  productsState: ProductStateReducer
});
export default rootReducer;
