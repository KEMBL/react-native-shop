import { StyleSheet, TextStyle, ImageStyle } from 'react-native';

import { Theme } from 'rns-theme/src/theme/Theme';

export interface ProductCardStyle {
  image: ImageStyle;
  title: TextStyle;
  price: TextStyle;
  units: TextStyle;
}

export const containerStyle = 'flex: 1; width: 100; cursor: pointer; margin-right: 10';

const steelSheetInstance = StyleSheet.create<ProductCardStyle>({
  image: {
    height: 100,
    width: 100
  },
  title: {
    textAlign: 'left',
    color: Theme.black,
    fontSize: 11,
    fontWeight: '400',
    fontFamily: Theme.fontFamily
  },
  price: {
    color: Theme.green,
    height: 27,
    fontSize: 11,
    fontWeight: '400',
    fontFamily: Theme.fontFamily
  },
  units: {
    color: Theme.grey,
    height: 27,
    fontSize: 11,
    fontWeight: '400',
    fontFamily: Theme.fontFamily
  }
});

export default steelSheetInstance;