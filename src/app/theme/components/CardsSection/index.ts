import { StyleSheet, ViewStyle, TextStyle } from "react-native";

import { Theme } from "./../../Theme";

export interface CardsSectionStyle {
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  buttonMoreContainer: ViewStyle;
  buttonMoreText: TextStyle;
  buttonMoreView: ViewStyle;
  cardsRowContainer: ViewStyle;
  cardsRow: ViewStyle;
}

const steelShitInstance = StyleSheet.create<CardsSectionStyle>({
  container: {
    flex: 1,
    flexDirection: "column",

    height: 195,
    backgroundColor: Theme.white,
    borderRadius: 3,
    borderWidth: 0.2,
    borderColor: "#CFCFCF",
    elevation: 2,
    marginBottom: 7,
    marginLeft: 6,
    marginRight: 6,
    paddingTop: 14,
    paddingLeft: 14
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10
  },
  title: {
    alignItems: "center",
    alignSelf: "stretch",
    textAlign: "left",
    fontSize: 13,
    fontFamily: Theme.fontFamily,
    color: Theme.textColor
  },
  buttonMoreContainer: {},
  buttonMoreView: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    width: 50,
    height: 17
  },
  buttonMoreText: {
    fontSize: 13,
    fontFamily: Theme.fontFamily,
    color: Theme.green
  },
  cardsRowContainer: {
    height: 160
  },
  cardsRow: {}
});

export default steelShitInstance;
