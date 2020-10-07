import { ApplicationState } from 'initialization';
import { CategoryId } from 'product-category';
import { nameofFactory } from 'shared';

export const uiStateBranchName = 'uiState';
nameofFactory<ApplicationState>()(uiStateBranchName); // name guard

const selectCurrentCategory = (state: ApplicationState): CategoryId => state.uiState.currentCategory;

export const selectors = { selectCurrentCategory };
