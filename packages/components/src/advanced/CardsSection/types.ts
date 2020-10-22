import { ProductId } from 'rns-types';

export interface ProductCardModel {
  id: ProductId;
  thumbnail: string;
  title: string;
  weight: number;
  price: string;
}
