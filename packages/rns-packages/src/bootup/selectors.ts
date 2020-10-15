import { ApplicationState } from '../initialization/redux-state';
import { BootUpProgressEnum, BootUpStatus } from './types';

const selectBootUpState = (state: ApplicationState): BootUpStatus => state.bootUpStatus;
export const isBootUpFailed = (state: ApplicationState): boolean => !!selectBootUpState(state).error;
export const isBootUpCompleted = (state: ApplicationState): boolean => {
  const progress = selectBootUpState(state).progress;
  return progress === BootUpProgressEnum.Done || progress === BootUpProgressEnum.Fail;
};
