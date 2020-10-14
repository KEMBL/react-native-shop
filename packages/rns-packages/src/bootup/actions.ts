import { CategoryId } from '../product-category';
import { actionCreator, FailedActionResultWithPayload } from '../shared';

/**
 * Action handlers
 */
const actionName = 'APP_BOOTUP';
const start = actionCreator.start(actionName);
//const done = actionCreator.done(actionName);
const fail = actionCreator.fail<FailedActionResultWithPayload<CategoryId>>(actionName);

export const appBootup = { start, fail };
