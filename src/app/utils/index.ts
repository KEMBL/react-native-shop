import { PricePropertiesModel } from "../models/ProductModels";
import ConfiguationService from "../services/ConfigurationService";

class PriceUtils {
  public makePriceString = (
    priceProperties: PricePropertiesModel[],
    index = -1,
    amount = 1
  ): string => {
    if (priceProperties == null || priceProperties.length === 0) {
      return "Ошибка цены";
    }

    if (priceProperties.length === 1) {
      index = 0;
    }

    const currency = ConfiguationService.currency;
    if (index > -1) {
      return `${priceProperties[index].price * amount} ${currency}`;
    }

    return `${priceProperties[0].price} - ${
      priceProperties[priceProperties.length - 1].price
    } ${currency}`;
  };
}

const priceUtils = new PriceUtils();
export { priceUtils as PriceUtils };
