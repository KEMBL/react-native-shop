import { IdentifierId } from 'shared';

export type ProductId = number;

export enum ProprtyUnitType {
  gram = 1,
  kilogramm = 2,
  millilitre = 3,
  litre = 4,
  centimetre = 5,
  item = 6
}

export interface PricePropertiesModel {
  propertyUnitType: ProprtyUnitType; // mg, kg, etc. could be mixed for same product
  price: number; // 200, 300, 3000
  property: number; // 100gr, 200gr, 2kg
}

export interface PriceModel {
  properties: PricePropertiesModel[];
}

/**
 * Product model as it required for the frontend
 */
export interface ProductModel extends IdentifierId<ProductId> {
  name: string;
  price: PriceModel;
  categoryId: number;
  imageUrls: string[];
  editDatetime: string;
}
