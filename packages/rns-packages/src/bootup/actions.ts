import { CategoryId } from 'rns-types';

import { actionCreator } from 'rns-packages/src/shared';
import { FailedActionResultWithPayload } from 'rns-packages/src/shared/types';

/**
 * Action handlers
 */
const actionName = 'APP_BOOTUP';
const start = actionCreator.start(actionName);
const fail = actionCreator.fail<FailedActionResultWithPayload<CategoryId>>(actionName);

export const appBootup = { start, fail };
