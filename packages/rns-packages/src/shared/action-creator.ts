import { ActionWithPayload, createAction } from 'robodux';

// these types are required for copatibility with `robodux` internal types as `robodux` does not export Creator types
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
declare type ActionCreator<P = unknown, T extends string = string> = (p: P) => ActionWithPayload<P, string>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
declare type ActionCreatorNoPayload<T extends string = string> = () => ActionWithPayload<undefined, string>;

const actionDoneSuffix = 'DONE';
const actionFailSuffix = 'FAIL';

const actionCreatorUnified = <T extends string = string, P = unknown>(
  type: T,
  actionSuffix: string,
  typed?: boolean
): ActionCreatorNoPayload<T> | ActionCreator<P, T> => {
  const actionName = `${type}_${actionSuffix}`;
  if (typed) {
    return createAction<P>(actionName);
  }
  return createAction(actionName);
};

function actionCreatorDone(type: string): ActionCreatorNoPayload<string>;
function actionCreatorDone<P = unknown>(type: string): ActionCreator<P, string>;
/**
 * Creates successfully ended action
 *
 * @param type of action
 *
 * @returns action
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function actionCreatorDone<P = unknown>(type: string): ActionCreatorNoPayload<string> | ActionCreator<P, string> {
  return actionCreatorUnified<string, P>(type, actionDoneSuffix);
}

function actionCreatorFail(type: string): ActionCreatorNoPayload<string>;
function actionCreatorFail<P = unknown>(type: string): ActionCreator<P, string>;
/**
 * Creates faulty ended action
 *
 * @param type of action
 *
 * @returns action
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function actionCreatorFail<P = unknown>(type: string): ActionCreatorNoPayload<string> | ActionCreator<P, string> {
  return actionCreatorUnified<string, P>(type, actionFailSuffix);
}

export const actionCreator = { start: createAction, done: actionCreatorDone, fail: actionCreatorFail };
