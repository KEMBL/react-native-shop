import { ActionWithPayload, createAction } from 'robodux';

// these types are required because `robodux` does not export Creator types
declare type ActionCreator<P = unknown, T extends string = string> = (p: P) => ActionWithPayload<P, string>;
declare type ActionCreatorNoPayload<T extends string = string> = () => ActionWithPayload<undefined, string>;

const actionDoneSuffix = 'DONE';
const actionFailSuffix = 'FAIL';

//export function actionCreator<T extends string = string>(type: T, actionSuffix: string, typed?: false): ActionCreatorNoPayload<T>;
//export function actionCreator<T extends string = string, P= unknown>(type: T, actionSuffix: string, typed?: true): ActionCreator<P, T>;
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
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function actionCreatorDone<P = unknown>(type: string): ActionCreatorNoPayload<string> | ActionCreator<P, string> {
  return actionCreatorUnified<string, P>(type, actionDoneSuffix);
}

function actionCreatorFail(type: string): ActionCreatorNoPayload<string>;
function actionCreatorFail<P = unknown>(type: string): ActionCreator<P, string>;
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function actionCreatorFail<P = unknown>(type: string): ActionCreatorNoPayload<string> | ActionCreator<P, string> {
  return actionCreatorUnified<string, P>(type, actionFailSuffix);
}

export const actionCreator = { start: createAction, done: actionCreatorDone, fail: actionCreatorFail };

//
// export interface ActionsFromFactory<TPayload, TSuccesPayload, TFailPayload> {
//   start: ActionCreatorNoPayload<string> | ActionCreator<TPayload, string>;
//   done: ActionCreatorNoPayload<string> | ActionCreator<TSuccesPayload, string>;
//   fail: ActionCreatorNoPayload<string> | ActionCreator<TFailPayload, string>;
// }
// /**
//  * Makes all actons at one step
//  *
//  * !!! Not possible as isPayloadTypeDefined is not possible to write in JS (not types at runtime)
//  * @param {string} name of action
//  *
//  * @returns {object} object with three actions for popular action states
//  */
// export const actionsFactory = <TPayload = undefined, TSuccesPayload = undefined, TFailPayload = undefined>(
//   name: string
// ): ActionsFromFactory<TPayload, TSuccesPayload, TFailPayload> => {
//   return {
//     start: isPayloadTypeDefined<TPayload>() ? createAction<TPayload>(name) : createAction(name),
//     done: isPayloadTypeDefined<TSuccesPayload>() ? creatorDone<TSuccesPayload>(name) : creatorDone(name),
//     fail: isPayloadTypeDefined<TFailPayload>() ? creatorFail<TFailPayload>(name) : creatorFail(name)
//   };
// };
