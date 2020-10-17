// redux-saga compatible type
interface ErrorInfo {
  sagaStack: string;
}

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
    // eslint-disable-next-line no-console
    console.error(`fnz error for num `, num, err); // do not use Debug here - circular dependency
    throw err;
  }
};

/**
 * Everything which helps to debg package code
 */
const startTime = new Date().getTime();
const timeDiff = (): string => fnz((new Date().getTime() - startTime) / 1000);

export const error = (scope: string) => {
  return (error: Error, errorInfo: ErrorInfo): void => {
    // eslint-disable-next-line no-console
    console.error(`${timeDiff} ${scope}`, error, errorInfo);
  };
};

export const debug = (scope: string) => {
  return (message: string | Error, ...args: unknown[]): void => {
    // eslint-disable-next-line no-console
    console.debug(`${timeDiff()} ${scope} ${message}`, ...args);
  };
};
