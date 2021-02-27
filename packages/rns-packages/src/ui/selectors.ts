import { CategoryId } from 'rns-types';

import { ApplicationState } from 'rns-packages/src/shared/types';

export const selectCurrentCategoryId = (state: ApplicationState): CategoryId => state.uiState.currentCategoryId;
export const selectCurrentProductId = (state: ApplicationState): CategoryId => state.uiState.currentProductId;
