import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import { Theme } from '../../Theme';
import { ButtonStyle } from '../../components/Button';

export const variantsButton: ButtonStyle = {
  button: {
    flex: 1,
    justifyContent: 'center',
    borderColor: '#dfdfdf',
    borderRadius: 3,
    borderWidth: 1,
    height: 30,
    width: 60,
    marginRight: 10
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Roboto',
    color: 'black'
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
};

export const variantsButtonHighlighted: ButtonStyle = {
  button: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'red',
    borderRadius: 3,
    borderWidth: 2,
    height: 30,
    width: 60,
    marginRight: 10
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Roboto',
    color: 'black'
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
};

export const quantityButton: ButtonStyle = {
  button: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 15,
    borderWidth: 0,
    height: 30,
    width: 30
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
    color: 'black',
    marginBottom: 3
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
};

export interface ProductPageStyle {
  /* the whole item page container */
  container: ViewStyle;
  image: ImageStyle;
  priceContainer: ViewStyle;
  price: TextStyle;
  infoContainer: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  variantsContainer: ViewStyle;
  variantSelectedText: TextStyle;
  quantityContainer: ViewStyle;
  quantitySelectorContainer: ViewStyle;
  quantitySelectorText: TextStyle;
}

export const ProductPageTheme = StyleSheet.create<ProductPageStyle>({
  container: {
    flex: 1,
    backgroundColor: Theme.white
  },
  image: {
    width: 300,
    height: 300
  },
  priceContainer: {
    height: 35,
    backgroundColor: '#f2f2f2'
  },
  price: {
    includeFontPadding: false,
    fontWeight: 'bold',
    color: Theme.black,
    fontSize: 19,
    marginTop: 5,
    marginLeft: 10
  },
  infoContainer: {
    paddingLeft: 10,
    marginTop: 10
  },
  titleContainer: {
    marginTop: 10
  },
  title: {
    fontSize: 15,
    color: Theme.black,
    lineHeight: 22
  },
  variantsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  variantSelectedText: {
    marginTop: 5,
    fontSize: 15,
    color: Theme.black
  },
  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: 200,
    marginTop: 5
  },
  quantitySelectorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20
  },
  quantitySelectorText: {
    fontSize: 20,
    color: Theme.black,
    marginLeft: 10,
    marginRight: 10
  }
});
