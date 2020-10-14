/**
 * Every enumarated object in store should follow that interface
 */
export interface IdentifierId<T> {
  id: T;
}

export interface FailedActionResult {
  error: string;
}

export interface FailedActionResultWithPayload<P> extends FailedActionResult {
  payload: P;
}

export interface Probability<TItem> {
  itemId: TItem;
  probability: number;
}
