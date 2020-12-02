import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

import { Theme } from '../../Theme';

export interface ButtonStyle {
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  text: TextStyle;
  textDisabled: TextStyle;
}

export const ButtonTheme = StyleSheet.create<ButtonStyle>({
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

export const RedDownButton: ButtonStyle = StyleSheet.create<ButtonStyle>({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4747',
    height: 47
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    color: Theme.white,
    textTransform: 'uppercase'
  },
  buttonDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.middleGrey,
    height: 47
  },
  textDisabled: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    color: Theme.white,
    textTransform: 'uppercase'
  }
});
