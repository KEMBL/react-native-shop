import { StyleSheet, ViewStyle } from 'react-native';

export interface DeliverySelectorStyle {
  container: ViewStyle;
}

export const DeliverySelectorTheme = StyleSheet.create<DeliverySelectorStyle>({
  container: {
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ADB1B8',
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: '#ECEEF1',
    height: 70,
    marginRight: 10,
    padding: 10,
    paddingLeft: 5
  }
});
