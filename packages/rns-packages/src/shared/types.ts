import { IdentifierId } from 'rns-types';

export interface FailedActionResult {
  error: string;
}

export interface FailedActionResultWithPayload<P> extends FailedActionResult {
  payload: P;
}

export interface Probability<TItem> extends IdentifierId<TItem> {
  probability: number;
}
