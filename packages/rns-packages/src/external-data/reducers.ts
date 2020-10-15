import merge from 'lodash.merge';
import { combineReducers } from 'redux';
import { ApplicationState } from '../initialization';

import { reducers as productReducers } from '../product';
import { reducers as categoryReducers } from '../category';
import { nameofFactory } from '../shared';

/**
 * Combines reducers for external data
 */

const externalDataReducer = combineReducers(merge({}, productReducers.default, categoryReducers.default));

const externalDataBranchName = 'externalData';
nameofFactory<ApplicationState>()(externalDataBranchName);

export default {
  [externalDataBranchName]: externalDataReducer // TODO: use slice here
};
