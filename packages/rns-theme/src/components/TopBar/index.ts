import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

import { Theme } from '../../Theme';

interface TopBarStyle {
  container: ViewStyle;
  /* area with clock, batarry, etc. */
  statusBar: ViewStyle;
  /* area with user menu and basket */
  toolBar: ViewStyle;
  /**
   * Left button and title
   */
  baseActions: ViewStyle;
  backIcon: ViewStyle;
  titleContainer: ViewStyle;
  childrenContainer: ViewStyle;
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
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 18,
    justifyContent: 'space-between'
  },
  baseActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backIcon: {
    marginTop: 3
  },
  titleContainer: {
    marginLeft: 15
  },
  childrenContainer: {
    marginTop: 3
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
    color: Theme.white
  }
});
