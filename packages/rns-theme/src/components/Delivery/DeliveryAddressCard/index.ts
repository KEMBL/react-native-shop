import { StyleSheet, ViewStyle } from 'react-native';

export interface DeliveryAddressCardStyle {
  container: ViewStyle;
}

export const DeliveryAddressCardTheme = StyleSheet.create<DeliveryAddressCardStyle>({
  container: {
    marginTop: 14,
    margin: 10,
    padding: 10,
    paddingLeft: 10,
    height: 200,
    borderRadius: 20,
    backgroundColor: 'white'
  }
});
