import { fnz } from '../shared';

// redux-saga compatible type
interface ErrorInfo {
  sagaStack: string;
}

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
