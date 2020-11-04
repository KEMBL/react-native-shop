import { PricePropertiesModel, ProprtyUnitType } from 'rns-types';

export class ProductUtils {
  public static cleanTitle = (name: string): string => {
    return name.replace(/&quot;/g, 'i');
  };
  /**
   * Simplified price string
   */
  public static makeSimpleAmountString = (priceProperties: PricePropertiesModel[], amountError: string): string => {
    if (priceProperties == null || priceProperties.length === 0) {
      return amountError;
    }

    if (priceProperties.length === 1) {
      const priceProperty = priceProperties[0];
      return `${priceProperty.property} ${ProductUtils.makePropertyUnit(priceProperty.propertyUnitType)}`;
    }

    const minPrice = ProductUtils.arrayMin(priceProperties.map((p) => p.price));
    const index = priceProperties.findIndex((e) => e.price === minPrice);
    const priceProperty = priceProperties[index];
    return `от ${priceProperty.property} ${ProductUtils.makePropertyUnit(priceProperty.propertyUnitType)}`;
  };

  /**
   * Simplified minimal price string
   */
  public static makeMinPriceString = (
    priceProperties: PricePropertiesModel[],
    currency: string,
    priceError: string
  ): string => {
    if (priceProperties == null || priceProperties.length === 0) {
      return priceError;
    }

    if (priceProperties.length === 1) {
      return `${priceProperties[0].price} ${currency}`;
    }

    const price = ProductUtils.arrayMin(priceProperties.map((p) => p.price));
    return `${price} ${currency}`;
  };

  public static makePriceString = (
    priceProperties: PricePropertiesModel[],
    currency: string,
    priceError: string,
    index = -1,
    amount = 1
  ): string => {
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

  public static makePropertyUnit = (propertyUnitType: ProprtyUnitType): string => {
    let unit = '??';
    switch (propertyUnitType) {
      case ProprtyUnitType.gram:
        unit = 'гр';
        break;
      case ProprtyUnitType.kilogramm:
        unit = 'кг';
        break;
      case ProprtyUnitType.millilitre:
        unit = 'мл';
        break;
      case ProprtyUnitType.litre:
        unit = 'л';
        break;
      case ProprtyUnitType.centimetre:
        unit = 'см';
        break;
      case ProprtyUnitType.item:
        unit = 'шт';
        break;
      default:
        // eslint-disable-next-line no-console
        console.warn('Unknown unit type', propertyUnitType);
        break;
    }
    return `${unit}.`;
  };

  public static makeButtonTitle = (priceProperty: PricePropertiesModel): string => {
    const unit = ProductUtils.makePropertyUnit(priceProperty.propertyUnitType);
    return `${priceProperty.property}${unit}`;
  };

  public static arrayMin = (arr: Array<number>) => {
    return arr.reduce((p, v) => {
      return p < v ? p : v;
    });
  };

  public static arrayMax = (arr: Array<number>) => {
    return arr.reduce((p, v) => {
      return p > v ? p : v;
    });
  };
}
