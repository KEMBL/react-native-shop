import { StyleSheet, ViewStyle } from 'react-native';

import { Theme } from '../../Theme';

interface DeliveryScreenStyle {
  container: ViewStyle;
  cards: ViewStyle;
}

export const DeliveryScreenTheme = StyleSheet.create<DeliveryScreenStyle>({
  container: {
    flex: 1,
    backgroundColor: Theme.white
  },
  cards: {
    flex: 1
  }
});
