import { ApplicationState } from 'rns-packages/src/shared/types';
import { nameofFactory } from 'rns-packages/src/shared';

import { ShoppingState } from './types';

const dataReducer = (state: ShoppingState = new ShoppingState()): ShoppingState => {
  return state;
};

export const shoppingStateBranchName = 'shopping';
nameofFactory<ApplicationState>()(shoppingStateBranchName); // name guard

export default {
  [shoppingStateBranchName]: dataReducer
};
