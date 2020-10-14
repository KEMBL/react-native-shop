import { ApplicationState } from '../initialization/redux-state';
import { BootUpProgressEnum, BootUpStatus } from './types';

const getBootUpState = (state: ApplicationState): BootUpStatus => state.bootUpStatus;
export const isBootUpFailed = (state: ApplicationState): boolean => !!getBootUpState(state).error;
export const isBootUpCompleted = (state: ApplicationState): boolean => {
  const progress = getBootUpState(state).progress;
  return progress === BootUpProgressEnum.Done || progress === BootUpProgressEnum.Fail;
};
