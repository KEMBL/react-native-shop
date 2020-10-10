import { ApplicationState } from '../initialization';
import { CategoryId } from '../product-category';
import { nameofFactory } from '../shared';

export const uiStateBranchName = 'uiState';
nameofFactory<ApplicationState>()(uiStateBranchName); // name guard

export const selectCurrentCategoryId = (state: ApplicationState): CategoryId => state.uiState.currentCategoryId;
