import { actionCreator } from '../shared';

/**
 * Set global status of loading something from API
 */
const actionName = 'LOADER_IN_PROGRESS';
const start = actionCreator.start(actionName);
const done = actionCreator.done(actionName);
const fail = actionCreator.fail(actionName);

export const setLoaderStatus = { start, done, fail };
