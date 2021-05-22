import { Configuration } from 'rns-types';

import { ApplicationState } from '../initialization/redux-state';

export const selectConfiguration = (state: ApplicationState): Configuration => state.configuration;
