import { ActionWithPayload, createAction } from 'robodux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type ActionCreator<P = any, T extends string = string> = (p: P) => ActionWithPayload<P, T>;
declare type ActionCreatorNoPayload<T extends string = string> = () => ActionWithPayload<undefined, T>;

// default way to make actions
export { createAction as creator };
export const actionSuccessSuffix = 'SUCCESS';
export const actionFailSuffix = 'FAIL';

export interface ActionNoPayloadSet {
  actionStart: ActionCreatorNoPayload<string>;
  actionSuccess: ActionCreatorNoPayload<string>;
  actionFail: ActionCreatorNoPayload<string>;
}

export interface ActionSet<P> {
  actionStart: ActionCreator<P, string>;
  actionSuccess: ActionCreator<P, string>;
  actionFail: ActionCreator<P, string>;
}

/**
 * Makes Success and Fail actions for given base action name
 * Might be convenient if all actions require the same payload
 */
export function createActionSet(
  actionName: string,
  successSuffix?: string,
  failSuffix?: string,
  typed?: false
): ActionNoPayloadSet;
export function createActionSet<P>(
  actionName: string,
  successSuffix?: string,
  failSuffix?: string,
  typed?: true
): ActionSet<P>;
/**
 * Created set of actions
 *
 * @param {string} actionName shared action name prefix
 * @param {string} successSuffix successSuffix
 * @param {string} failSuffix failSuffix
 * @param {boolean} typed typed
 *
 * @returns {object} object with prepared Start, Success, Progress actions inside
 */
export function createActionSet<P>(
  actionName: string,
  successSuffix?: string,
  failSuffix?: string,
  typed?: boolean
): ActionSet<P> | ActionNoPayloadSet {
  successSuffix = successSuffix ?? actionSuccessSuffix;
  failSuffix = failSuffix ?? actionFailSuffix;
  const actionSuccessName = `${actionName}_${successSuffix}`;
  const actionFailName = `${actionName}_${failSuffix}`;
  if (typed) {
    //const payloadInstance: P = typeInstancer<P>('' as never);
    const actionStart = createAction<P>(actionName);
    const actionSuccess = createAction<P>(actionSuccessName);
    const actionFail = createAction<P>(actionFailName);
    return { actionStart, actionSuccess, actionFail };
  }

  const actionStart = createAction(actionName);
  const actionSuccess = createAction(actionSuccessName);
  const actionFail = createAction(actionFailName);
  return { actionStart, actionSuccess, actionFail };
}

// TODO: try to revrite in arrow function style
//type NoPayloadType = unknown | undefined;
//
// type ActionOverload = {
//     (actionName: string, successSuffix?: string, failSuffix?: string, typed?: boolean): ActionNoPayloadSet;
//     <P>(actionName: string, successSuffix?: string, failSuffix?: string, typed?: boolean): ActionSet<P>;
//   };

// export const createActionSet: ActionOverload = <P>(
//   actionName: string,
//   successSuffix?: string,
//   failSuffix?: string,
//   typed?: boolean
// ): ActionNoPayloadSet | ActionSet<P>  => {
//   const actionSuccessName = `${actionName}_${successSuffix}`;
//   const actionFailName = `${actionName}_${failSuffix}`;
//   if (typed) {
//     //const payloadInstance: P = typeInstancer<P>('' as never);
//     const actionStart = createAction<P>(actionName);
//     const actionSuccess = createAction<P>(actionSuccessName);
//     const actionFail = createAction<P>(actionFailName);
//     return { actionStart, actionSuccess, actionFail };
//   }

//   const actionStart = createAction(actionName);
//   const actionSuccess = createAction(actionSuccessName);
//   const actionFail = createAction(actionFailName);
//   return { actionStart, actionSuccess, actionFail };
// };
