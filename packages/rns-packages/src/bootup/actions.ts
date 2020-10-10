import { CategoryId } from '../product-category';
import { actionCreator, FailedPayload } from '../shared';

/**
 * Action handlers
 */
const actionName = 'APP_BOOTUP';
const start = actionCreator.start(actionName);
const done = actionCreator.done(actionName);
const fail = actionCreator.fail<FailedPayload<CategoryId>>(actionName);

export const appBootup = { start, done, fail };
