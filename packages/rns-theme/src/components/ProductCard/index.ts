import { StyleSheet, TextStyle, ImageStyle, ViewStyle } from 'react-native';

import { Theme } from '../../Theme';

export interface ProductCardStyle {
  container: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  price: TextStyle;
  units: TextStyle;
}

export const ProductCardTheme = StyleSheet.create<ProductCardStyle>({
  container: {
    flex: 1,
    width: 100,
    marginRight: 5,
    marginLeft: 5
  },
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
