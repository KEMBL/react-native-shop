import { actionCreator } from 'rns-packages/src/shared';
import { CategoryId, FailedActionResultWithPayload } from 'rns-packages/src/shared/types';

/**
 * Action handlers
 */
const actionName = 'APP_BOOTUP';
const start = actionCreator.start(actionName);
//const done = actionCreator.done(actionName);
const fail = actionCreator.fail<FailedActionResultWithPayload<CategoryId>>(actionName);

export const appBootup = { start, fail };
