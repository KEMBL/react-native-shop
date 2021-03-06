import { Configuration } from 'rns-types';

import { ApplicationState } from '../initialization';
import { nameofFactory } from '../shared';

/**
 * Combines reducers for external data
 */

const dataReducer = (state: Configuration = new Configuration()): Configuration => {
  return state;
};

const branchName = 'configuration';
nameofFactory<ApplicationState>()(branchName);

export default {
  [branchName]: dataReducer // TODO: use slice here
};
