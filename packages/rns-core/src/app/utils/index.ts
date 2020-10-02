import { PricePropertiesModel } from '../models/Product/ProductModels';
import { ConfiguationService } from '../services';

class PriceUtils {
  public makePriceString = (priceProperties: PricePropertiesModel[], index = -1, amount = 1): string => {
    const { currency, priceError } = ConfiguationService;
    if (priceProperties == null || priceProperties.length === 0) {
      return priceError;
    }

    if (priceProperties.length === 1) {
      index = 0;
    }

    if (index > -1) {
      return `${priceProperties[index].price * amount} ${currency}`;
    }

    return `${priceProperties[0].price} - ${priceProperties[priceProperties.length - 1].price} ${currency}`;
  };
}

const priceUtils = new PriceUtils();
export { priceUtils as PriceUtils };
