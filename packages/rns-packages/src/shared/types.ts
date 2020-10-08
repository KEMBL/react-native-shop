/**
 * Every enumarated object in store should follow that interface
 */
export interface IdentifierId<T> {
  id: T;
}

export interface FailedPayload<P> {
  payload: P;
  error: string;
}
