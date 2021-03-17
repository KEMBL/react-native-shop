import { ProductId, ShoppingInfo } from 'rns-types';

import { ApplicationState, ShoppingState } from 'rns-packages/src/shared/types';
import { debug as Debug, nameofFactory } from 'rns-packages/src/shared';

import {
  addProductToShoppingCart,
  cleanShoppingCart,
  decreaseProductInShoppingCart,
  increaseProductInShoppingCart,
  removeProductFromShoppingCart
} from './actions';

const debug = Debug('app:reducers:shopping');

export interface CleanShoppingCartAction {
  type: string;
}

export interface AddProductToShoppingCartAction {
  type: string;
  payload: ShoppingInfo;
}

export interface RemoveProductFromShoppingCartAction {
  type: string;
  payload: ProductId;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IncreaseProductToShoppingCartAction extends AddProductToShoppingCartAction {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DecreaseProductToShoppingCartAction extends AddProductToShoppingCartAction {}

const increaseProduct = (product: ShoppingInfo, count: number): void => {
  product.quantity += count;
};

const decreaseProduct = (product: ShoppingInfo, count: number): void => {
  product.quantity -= count;
};

type ActionTypes =
  | CleanShoppingCartAction
  | AddProductToShoppingCartAction
  | RemoveProductFromShoppingCartAction
  | IncreaseProductToShoppingCartAction
  | DecreaseProductToShoppingCartAction;

const dataReducer = (state: ShoppingState = new ShoppingState(), action: ActionTypes): ShoppingState => {
  switch (action.type) {
    case `${cleanShoppingCart.start}`: {
      if (state.shoppingCartList.length === 0) {
        return state;
      }
      return { ...state, shoppingCartList: [] };
    }

    case `${addProductToShoppingCart.start}`: {
      const myAction = action as AddProductToShoppingCartAction;

      if (myAction.payload.quantity < 1) {
        debug('Too small quantity of product to add it', myAction.payload);
        return state;
      }

      const product = state.shoppingCartList.find((p) => p.productId === myAction.payload.productId);

      debug('Quantity', myAction.payload, product);

      if (product) {
        increaseProduct(product, myAction.payload.quantity);
      } else {
        state.shoppingCartList.push(myAction.payload);
      }
      return { ...state, shoppingCartList: state.shoppingCartList };
    }

    case `${removeProductFromShoppingCart.start}`: {
      const myAction = action as RemoveProductFromShoppingCartAction;

      const index = state.shoppingCartList.findIndex((p) => p.productId === myAction.payload);
      if (index === -1) {
        debug('Cannot find product to remove', myAction.payload);
        return state;
      }

      state.shoppingCartList.splice(index, 1);
      return { ...state, shoppingCartList: state.shoppingCartList };
    }

    case `${increaseProductInShoppingCart.start}`: {
      const myAction = action as IncreaseProductToShoppingCartAction;

      if (myAction.payload.quantity < 1) {
        debug('Too small quantity of product to increase it', myAction.payload);
        return state;
      }

      const product = state.shoppingCartList.find((p) => p.productId === myAction.payload.productId);
      if (!product) {
        debug('Cannot find product to increase', myAction.payload);
        return state;
      }

      increaseProduct(product, myAction.payload.quantity);
      return { ...state, shoppingCartList: state.shoppingCartList };
    }

    case `${decreaseProductInShoppingCart.start}`: {
      const myAction = action as DecreaseProductToShoppingCartAction;

      if (myAction.payload.quantity < 1) {
        debug('Too small quantity of product to decrease it', myAction.payload);
        return state;
      }

      const product = state.shoppingCartList.find((p) => p.productId === myAction.payload.productId);
      if (!product) {
        debug('Cannot find product to decrease', myAction.payload);
        return state;
      }

      if (product.quantity === 1) {
        debug('Too less quantity to decrease it', myAction.payload, product);
        return state;
      }

      if (myAction.payload.quantity > product.quantity) {
        debug('Too big quantity of product to decrease it', myAction.payload, product);
        return state;
      }

      decreaseProduct(product, myAction.payload.quantity);
      return { ...state, shoppingCartList: state.shoppingCartList };
    }

    default:
      return state;
  }
};

export const shoppingStateBranchName = 'shopping';
nameofFactory<ApplicationState>()(shoppingStateBranchName); // name guard

export default {
  [shoppingStateBranchName]: dataReducer
};
