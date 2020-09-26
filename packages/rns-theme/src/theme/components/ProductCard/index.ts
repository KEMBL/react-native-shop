import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import { Theme } from '../../Theme';

export interface ProductCardStyle {
  container: ViewStyle;
  image: ImageStyle;
  weight: TextStyle;
  price: TextStyle;
  title: TextStyle;
}

const steelSheetInstance = StyleSheet.create<ProductCardStyle>({
  container: {
    flex: 1,
    width: 100
  },
  image: {
    height: 100,
    width: 100
  },
  weight: {
    marginRight: 10,
    textAlign: 'left',
    color: Theme.grey,
    height: 27,
    fontSize: 11,
    fontWeight: '400',
    fontFamily: Theme.fontFamily
  },
  price: {
    marginRight: 10,
    textAlign: 'right',
    color: Theme.green,
    height: 27,
    fontSize: 11,
    fontWeight: '400',
    fontFamily: Theme.fontFamily
  },
  title: {
    textAlign: 'left',
    color: Theme.black,
    fontSize: 11,
    fontWeight: '400',
    fontFamily: Theme.fontFamily
  }
});

export default steelSheetInstance;
