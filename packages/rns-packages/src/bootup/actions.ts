import { CategoryId } from 'product-category';
import { createActionSet, creator, FailedActionWithPayload } from 'shared';

/**
 * Action handlers
 */
const actionName = 'APP_BOOTUP';
export const { actionStart: appBootup, actionSuccess: appBootupComplete } = createActionSet<CategoryId>(actionName);
export const appBootupCompleteFail = creator<FailedActionWithPayload<CategoryId>>(actionName);
