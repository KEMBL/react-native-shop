import {combineReducers} from 'redux';

import {ProductStateReducer} from './Products.duck';

const rootReducer = combineReducers({
  // applicationState: ApplicationStateReducer, //TODO: do we relly need this global reducer?
  productsState: ProductStateReducer
});
export default rootReducer;
