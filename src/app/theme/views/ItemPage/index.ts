import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

import { Theme } from "./../../Theme";

export interface ItemPageStyle {
  container: ViewStyle;
  /* area with clock, batarry, etc. */
  statusBar: ViewStyle;
  /* area with user menu and basket */
  toolBar: ViewStyle;
  image: ImageStyle;
  priceContainer: ViewStyle;
  // priceFlexContainer: ViewStyle;
  price: TextStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  variantsContainer: ViewStyle;
  variantsButton: ViewStyle;
  variantsButtonText: TextStyle;
  variantSelectedText: TextStyle;
  amountContainer: ViewStyle;
  amountSelectorContainer: ViewStyle;
  amountSelectorText: TextStyle;
  deliverySelectedText: TextStyle;
  buyBar: ViewStyle;
}

const steelShitInstance = StyleSheet.create<ItemPageStyle>({
  container: {
    backgroundColor: Theme.white
  },
  statusBar: {
    backgroundColor: Theme.darkGreen
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
    height: 35,
    backgroundColor: "#f2f2f2"
  },
  // priceFlexContainer: {
  //   height: 52,
  //   backgroundColor: "green"
  // },
  price: {
    includeFontPadding: false,
    fontFamily: "sans-serif-condensed",
    fontWeight: "bold",
    color: Theme.black,
    fontSize: 19,
    marginTop: 5,
    marginLeft: 10
  },
  titleContainer: {
    marginTop: 10
    // marginLeft: 10
  },
  title: {
    fontFamily: "sans-serif-condensed",
    // fontWeight: "500",
    fontSize: 15,
    color: Theme.black,
    lineHeight: 22
    // flex: 1,
  },
  variantsContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5
    // backgroundColor: "blue"
  },
  variantsButton: {
    // width: 80,
    // height: 30,
    // paddingLeft: 10
    // backgroundColor: "blue"
  },
  variantsButtonText: {
    // color: Theme.black,
    // padding: 5,
    // fontSize: 13
  },
  variantSelectedText: {
    marginTop: 5,
    fontFamily: "sans-serif-condensed",
    fontSize: 15,
    color: Theme.black
  },
  amountContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: 180,
    marginTop: 5
  },
  amountSelectorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20
  },
  amountSelectorText: {
    // marginTop: 10,
    fontFamily: "roboto",
    fontSize: 20,
    color: Theme.black
  },
  deliverySelectedText: {
    marginTop: 5,
    fontFamily: "sans-serif-condensed",
    fontSize: 15,
    color: Theme.black
  },
  buyBar: {
    height: 52,
    backgroundColor: "#ffdad7"
  }
});

export default steelShitInstance;
