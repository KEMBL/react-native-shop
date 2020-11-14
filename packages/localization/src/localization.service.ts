import * as RNLocalize from 'react-native-localize';
import { I18nManager } from 'react-native';
import i18n from 'i18n-js';

import { default as en } from './translations/en';
import { default as ru } from './translations/ru';
import { translate } from './translate';

interface Translation {
  [key: string]: string;
}

class LocalizationService {
  private fallback = { languageTag: 'ru', isRTL: false };

  private translationGetters = new Map<string, Translation>([
    ['en', en],
    ['ru', ru]
  ]);

  /***
   * Initializates localization service taking current language from device settings
   */
  init = (): void => {
    let { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(this.translationGetters)) || this.fallback;

    if (!this.translationGetters.has(languageTag)) {
      languageTag = this.fallback.languageTag;
      isRTL = this.fallback.isRTL;
    }

    // clear translation cache
    translate.cache.clear?.();

    // update layout direction
    I18nManager.forceRTL(isRTL);

    // set i18n-js config
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    i18n.translations = { [languageTag]: this.translationGetters.get(languageTag)! };
    i18n.locale = languageTag;
  };
}

const localizationService = new LocalizationService();
export { localizationService as LocalizationService };
