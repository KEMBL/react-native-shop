import i18n, { TranslateOptions } from 'i18n-js';
import memoize from 'lodash.memoize';

/**
 * Makes first symbol in string capital
 */
const capitalize = (s: string): string => {
  return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
};

/**
 * Search translation in vocabulary and memoize it
 */
export const translate = memoize(
  //  (key, config?) => i18n.t(key, config),
  (key: string, options?: TranslateOptions) => {
    options = options ?? { defaultValue: '' };
    let translation = i18n.translate(key, options);

    if (!translation) {
      // Warn! would not work if `key` message has anther capital letters, like city names
      translation = i18n.translate(key.toLowerCase(), options);
      //!!! in a simplest case  we think that the first letter is capital but there could be more capital letters in string so
      // to avoid translation problems is better to add such difficult strings to vocabulary file
      if (translation) {
        return capitalize(translation);
      }
    }

    if (!translation) {
      console.warn('Cannot translate', key, options);
      return key;
    }

    return translation;
  }
);
