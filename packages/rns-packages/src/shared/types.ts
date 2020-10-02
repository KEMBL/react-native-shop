/**
 * Every enumarated object in store should follow that interface
 */
export interface IdentifierId<T> {
  id: T;
}

export interface FailedAction {
  error: string;
}

export interface FailedActionWithPayload<P> extends FailedAction {
  payload: P;
}
