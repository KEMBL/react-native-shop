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

const button: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FF4747',
  height: 47
};

const titleText: TextStyle = {
  textAlign: 'center',
  textAlignVertical: 'center',
  fontSize: 15,
  color: Theme.white,
  textTransform: 'uppercase'
};

const buttonDisabled: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Theme.middleGrey,
  height: 47
};

const titleTextDisabled: TextStyle = {
  textAlign: 'center',
  textAlignVertical: 'center',
  fontSize: 15,
  color: Theme.white,
  textTransform: 'uppercase'
};

export const RedDownButton: ButtonStyle = StyleSheet.create<ButtonStyle>({
  button,
  text: titleText,
  buttonDisabled,
  textDisabled: titleTextDisabled
});

export const FakeDisabledDownButton: ButtonStyle = StyleSheet.create<ButtonStyle>({
  button: buttonDisabled,
  text: titleTextDisabled,
  buttonDisabled,
  textDisabled: titleTextDisabled
});
