import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { Theme } from '../../Theme';

export interface CicrcleBadgeStyle {
  wrapper: ViewStyle;
  innerContainer: ViewStyle;
}

export const CicrcleBadgeTheme = StyleSheet.create<CicrcleBadgeStyle>({
  wrapper: {},
  innerContainer: {
    position: 'absolute',
    right: -10,
    top: -6,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 11,
    fontFamily: Theme.fontFamily,
    backgroundColor: Theme.red
  }
});

export const BadgeText: TextStyle = {
  color: Theme.white,
  paddingBottom: 2
};
