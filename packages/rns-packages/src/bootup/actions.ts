import { CategoryId } from '../product-category';
import { createActionSet, creator, FailedPayload } from '../shared';

/**
 * Action handlers
 */
const actionName = 'APP_BOOTUP';
export const { actionStart: appBootup, actionSuccess: appBootupComplete } = createActionSet<CategoryId>(actionName);
export const appBootupCompleteFail = creator<FailedPayload<CategoryId>>(actionName);
