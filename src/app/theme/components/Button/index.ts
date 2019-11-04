import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

import {Theme} from './../../Theme';

export interface ButtonStyle {
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  text: TextStyle;
  textDisabled: TextStyle;
}

const steelSheetInstance = StyleSheet.create<ButtonStyle>({
  button: {},
  text: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: Theme.fontFamily
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
});

export default steelSheetInstance;
