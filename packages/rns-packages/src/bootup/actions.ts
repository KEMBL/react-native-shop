import { createActionSet } from 'shared';

/**
 * Action handlers
 */
const actionName = 'APP_BOOTUP';
export const { actionStart: appBootup, actionSuccess: appBootupComplete } = createActionSet(actionName);
export const { actionFail: appBootupCompleteFail } = createActionSet<string>(actionName);
