import { StyleSheet, ViewStyle } from 'react-native';

import { Theme } from '../../Theme';

interface DeliveryScreenStyle {
  container: ViewStyle;
}

export const DeliveryScreenTheme = StyleSheet.create<DeliveryScreenStyle>({
  container: {
    flex: 1,
    backgroundColor: Theme.lightGrey
  }
});
