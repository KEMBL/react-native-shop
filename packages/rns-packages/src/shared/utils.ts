import { debug as Debug } from '../debug';

const debug = Debug('app:utils');
/**
 * Returns a number with fixed numbers amount after comma
 *
 * @param {number} num to fix
 * @param {number} fixedVals to left after a coma
 *
 * @returns {string} fixed numebr
 */
export const fnz = (num: number, fixedVals = 4): string => {
  if (num === 0) {
    return num.toString();
  }

  if (Math.abs(num) >= 1) {
    return num.toFixed(fixedVals);
  }

  if (Math.abs(num) < 0.000000001) {
    return 'TOSMALL!';
  }

  try {
    return num.toFixed(1 - Math.floor(Math.log(Math.abs(num % 1)) / Math.log(10)));
  } catch (err) {
    debug(`fnz error for num `, num, err);
    throw err;
  }
};
