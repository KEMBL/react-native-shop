import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ApplicationState } from './types';

// more https://stackoverflow.com/questions/57464286/how-to-correctly-use-a-curried-selector-function-with-react-reduxs-useselector
// more: https://react-redux.js.org/api/hooks#using-memoizing-selectors
export type ParametrizedSelector<A, R> = (state: ApplicationState, arg: A) => R;
// export type ParamLessSelector<R> = (state: ApplicationState) => R;

/**
 * Stub for selector argument
 *
 * @param {any} _  state object
 * @param {object} param proxed selectore
 *
 * @returns {object} selector given in param
 */
export const proxyParam: <T>(_: ApplicationState, param: T) => T = (_, param) => param;
export const selectState = (state: ApplicationState): ApplicationState => state;
/**
 * Helper to make memoized selector with parameter
 *
 * @param {object} selectorCreator selector object for memoization
 * @param {any} argument parameter for memoize3d selector
 *
 * @returns {object} memoized parametrized selector
 */
export const useMemoizedSelectorWithParam = <A, R>(
  selectorCreator: () => ParametrizedSelector<A, R>,
  argument: A
): R => {
  const tempArgument = typeof argument === 'object' ? JSON.stringify(argument) : argument;
  const memoizedSelector = useMemo(() => {
    const parametrizedSelector = selectorCreator();
    return (state: ApplicationState): R => parametrizedSelector(state, argument);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorCreator, tempArgument]);
  return useSelector(memoizedSelector);
};

// /**
//  * Helper to make memoized selector without parameter
//  *
//  * @param {object} selectorCreator selector object for memoization
//  *
//  * @returns {object} memoized parametrized selector
//  */
// export const useMemoizedSelectorWithoutParam = <R>(selectorCreator: () => ParamLessSelector<R>): R => {
//   const memoizedSelector = useMemo(() => {
//     const parametrizedSelector = selectorCreator();
//     return (state: ApplicationState): R => parametrizedSelector(state);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectorCreator]);
//   return useSelector(memoizedSelector);
// };

// more https://github.com/reduxjs/react-redux/pull/1288#issuecomment-493676858
// const getShallowComapredSelector = selector => {
//   let latestResult;
//   return state => {
//     const result = selector(state);
//     if (shallowEqual(result, latestResult) {
//       return latestResult;
//     }
//     return (latestlResult = result);
//   }
// }

// const useMemoizedSelector = selector => {
//   const memoizedSelector = useMemo(
//     () => getShallowComapredSelector(selector),
//     [selector]
//   );
//   return useSelector(memoizedSelector);
// }
