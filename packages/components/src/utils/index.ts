import { PricePropertiesModel, ProprtyUnitType } from 'rns-types';

export class PriceUtils {
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
    let unit = '';
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
        console.warn('Unknown unit type', propertyUnitType);
        break;
    }
    return `${unit}.`;
  };

  public static makeButtonTitle = (priceProperty: PricePropertiesModel): string => {
    const unit = PriceUtils.makePropertyUnit(priceProperty.propertyUnitType);
    return `${priceProperty.property}${unit}`;
  };
}
