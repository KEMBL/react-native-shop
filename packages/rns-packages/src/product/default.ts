import { ProductModel, PriceModel, ProprtyUnitType } from 'rns-types';

const notFoundPriceModel: PriceModel = {
  properties: [{ propertyUnitType: ProprtyUnitType.gram, price: 0, property: 0 }]
};

export const notFoundProduct: ProductModel = {
  id: -1,
  name: 'Unknown product / Товар не найден',
  price: notFoundPriceModel,
  categoryId: 0,
  imageUrls: [''],
  editDatetime: ''
};
