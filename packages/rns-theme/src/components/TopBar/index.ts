import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

import { Theme } from '../../Theme';

interface TopBarStyle {
  container: ViewStyle;
  /* area with clock, batarry, etc. */
  statusBar: ViewStyle;
  /* area with user menu and basket */
  toolBar: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
}

export const TopBarTheme = StyleSheet.create<TopBarStyle>({
  container: {
    height: 52,
    backgroundColor: Theme.green
  },
  statusBar: {
    backgroundColor: Theme.darkGreen
  },
  toolBar: {
    flex: 1,
    flexDirection: 'row',
    height: 52,
    alignItems: 'flex-start',
    paddingTop: 17,
    paddingLeft: 15
  },
  titleContainer: {
    marginLeft: 15
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
    color: Theme.white
  }
});
