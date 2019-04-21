import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

import { Theme } from "./../../Theme";

export interface ProductCardStyle {
  container: ViewStyle;
  image: ImageStyle;
  price: TextStyle;
  title: TextStyle;
}

const steelShitInstance = StyleSheet.create<ProductCardStyle>({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.white,
    height: 410,
    width: 260
  },
  image: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    height: 256,
    width: 256
  },
  price: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    textAlign: "right",
    color: Theme.green,
    height: 27
  },
  title: {
    alignItems: "center",
    alignSelf: "center",
    textAlign: "left",
    color: Theme.grey
  }
});

export default steelShitInstance;
