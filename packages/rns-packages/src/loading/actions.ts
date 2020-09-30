import { createActionSet } from 'shared';

export const {
  actionStart: setLoaderStart,
  actionSuccess: setLoaderSuccess,
  actionFail: setLoaderFail
} = createActionSet('LOADER_IN_PROGRESS');
