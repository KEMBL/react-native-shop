import merge from 'lodash.merge';
import { combineReducers } from 'redux';
import { ApplicationState } from '../initialization';

import { nameofFactory } from 'rns-packages/src/shared';
import { reducers as productReducers } from 'rns-packages/src/product';
import { reducers as categoryReducers } from 'rns-packages/src/category';

/**
 * Combines reducers for external data
 */

const externalDataReducer = combineReducers(merge({}, productReducers, categoryReducers));

const externalDataBranchName = 'externalData';
nameofFactory<ApplicationState>()(externalDataBranchName);

export default {
  [externalDataBranchName]: externalDataReducer // TODO: use slice here
};
