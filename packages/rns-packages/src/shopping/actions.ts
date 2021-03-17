import { ProductId, ShoppingInfo } from 'rns-types';

import { actionCreator } from 'rns-packages/src/shared';

const setAddProductToShoppingCartStart = actionCreator.start<ShoppingInfo>('ADD_PRODUCT_TO_SHOPPING_CART');
export const addProductToShoppingCart = { start: setAddProductToShoppingCartStart };

const setRemoveProductFromShoppingCartStart = actionCreator.start<ProductId>('REMOVE_PRODUCT_FROM_SHOPPING_CART');
export const removeProductFromShoppingCart = { start: setRemoveProductFromShoppingCartStart };

const setIncreaseProductInShoppingCartStart = actionCreator.start<ShoppingInfo>('INCREASE_PRODUCT_IN_SHOPPING_CART');
export const increaseProductInShoppingCart = { start: setIncreaseProductInShoppingCartStart };

const setDecreaseProductInShoppingCartStart = actionCreator.start<ShoppingInfo>('DECREASE_PRODUCT_IN_SHOPPING_CART');
export const decreaseProductInShoppingCart = { start: setDecreaseProductInShoppingCartStart };

const setCleanShoppingCartStart = actionCreator.start('CLEAN_SHOPPING_CART');
export const cleanShoppingCart = { start: setCleanShoppingCartStart };
