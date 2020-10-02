import { ApplicationState } from '../redux-state';
import { BootUpProgressEnum, BootUpStatus } from './types';

export const getBootUpState = (state: ApplicationState): BootUpStatus => state.bootUpStatus;
export const isBootUpFailed = (state: ApplicationState): boolean => getBootUpState(state).error !== undefined;
export const isBootUpCompleted = (state: ApplicationState): boolean => {
  const progress = getBootUpState(state).progress;
  return progress === BootUpProgressEnum.Success || progress === BootUpProgressEnum.Fail;
};
