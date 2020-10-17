import { ProductsCollection } from 'rns-types';

import { FailedActionResult } from 'rns-packages/src/shared/types';
import { actionCreator } from 'rns-packages/src/shared';

/**
 * Requests all products
 */

const actionName = 'FETCH_ALL_PRODUCTS';
const start = actionCreator.start(actionName);
const done = actionCreator.done<ProductsCollection>(actionName);
const fail = actionCreator.fail<FailedActionResult>(actionName);

export const fetchProducts = { start, done, fail };
