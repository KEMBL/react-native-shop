import { StyleSheet, ViewStyle } from 'react-native';

import { Theme } from 'rns-theme/src/Theme';

export interface DeliveryAddressCardStyle {
  container: ViewStyle;
}

export const DeliveryAddressCardTheme = StyleSheet.create<DeliveryAddressCardStyle>({
  container: {
    marginTop: 14,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 6,
    paddingBottom: 12,
    backgroundColor: Theme.white,
    elevation: 4, // does not work on iOS
    shadowOffset: { width: 0, height: 4 },
    shadowColor: Theme.black,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    overflow: 'hidden'
  }
});
