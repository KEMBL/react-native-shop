/**
 * Price for different SKU of the same product
 */

export enum ProprtyUnitType {
  gram = 1,
  kilogramm = 2,
  millilitre = 3,
  litre = 4,
  centimetre = 5,
  item = 6,
}

export interface PricePropertiesModel {
  price: number; // 200, 300, 3000
  property: string; // 100gr, 200gr, 2kg
}

export interface PriceModel {
  title: string; // Weight
  propertyUnitType: ProprtyUnitType;
  properties: PricePropertiesModel[];
}

export interface ProductModel {
  id: number;
  name: string;
  price: PriceModel;
  categoryId: number;
  imageUrls: string[];
}

export enum ProductLoadingState {
  success,
  isLoading,
  error
}
