import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

import { Theme } from "./../../Theme";

export interface ItemPageStyle {
  container: ViewStyle;
  statusBar: ViewStyle;
  toolBar: ViewStyle;
  image: ImageStyle;
  priceContainer: ViewStyle;
  priceFlexContainer: ViewStyle;
  price: TextStyle;
  variantsContainer: ViewStyle;
}

const steelShitInstance = StyleSheet.create<ItemPageStyle>({
  container: {
    backgroundColor: Theme.white,
  },
  statusBar: {
    backgroundColor: Theme.darkGreen,
  },
  toolBar: {
    height: 52,
    backgroundColor: Theme.green
  },
  image: {
      width: 300,
      height: 300
  },
  priceContainer: {
    height: 52,
    backgroundColor: "red"
  },
  priceFlexContainer: {
    height: 52,
    backgroundColor: "green"
  },
  price: {
    fontSize: 20
  },
  variantsContainer: {
    flex: 1,
    flexDirection: "row",
//    height: 52,
    backgroundColor: "blue"
  }
});

export default steelShitInstance;
