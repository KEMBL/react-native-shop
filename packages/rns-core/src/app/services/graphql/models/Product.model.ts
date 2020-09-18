import { gql } from '@apollo/client';
import { ProductModel } from '../../../models';

export interface ProductDataModel {
  products: ProductModel[];
}

export interface ProductDataVars {
  id: number;
}

export const GET_PRODUCTS = gql`
  fragment ProductFields on Product {
    id
    name
    categoryId
    editDatetime
    price {
      properties {
        propertyUnitType
        price
        property
      }
    }
  }
  query GetProducts($id: Int!) {
    rocketInventory(id: $id) {
      ...ProductFields
    }
  }
`;
