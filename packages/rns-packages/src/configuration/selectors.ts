import { ApplicationState } from '../initialization/redux-state';
import { Configuration } from './types';

export const selectConfiguration = (state: ApplicationState): Configuration => state.configuration;
