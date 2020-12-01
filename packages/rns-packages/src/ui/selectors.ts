import { CategoryId } from 'rns-types';

import { ApplicationState } from 'rns-packages/src/shared/types';
import { nameofFactory } from 'rns-packages/src/shared';

export const uiStateBranchName = 'uiState';
nameofFactory<ApplicationState>()(uiStateBranchName); // name guard

export const selectCurrentCategoryId = (state: ApplicationState): CategoryId => state.uiState.currentCategoryId;
export const selectCurrentProductId = (state: ApplicationState): CategoryId => state.uiState.currentProductId;
export const selectIsDeliveryManagerOpened = (state: ApplicationState): boolean =>
  state.uiState.isDeliveryManagerOpened;
