// ! types should never be exported from index.ts - that producing import cyclar dependencies!

// package typoes
export * from 'rns-packages/src/bootup/types';
export * from 'rns-packages/src/category/types';
export * from 'rns-packages/src/ui/types';
export * from 'rns-packages/src/configuration/types';
export * from 'rns-packages/src/initialization/redux-state/types';

// shared types
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
