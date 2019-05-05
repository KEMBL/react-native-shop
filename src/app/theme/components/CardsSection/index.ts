import { StyleSheet, ViewStyle, TextStyle } from "react-native";

import { Theme } from "./../../Theme";

export interface CardsSectionStyle {
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  button: ViewStyle;
  cardsRow: ViewStyle;
}

const steelShitInstance = StyleSheet.create<CardsSectionStyle>({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: Theme.green,
    // height: 580,
    // width: 1040
  },
  header: {
    flex: 1,
    flexDirection: "row"
  },
  title: {
    alignItems: "center",
    alignSelf: "center",
    textAlign: "left",
    color: Theme.grey
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.white,
    height: 410,
    width: 260
  },
  cardsRow: {
    // flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: Theme.white,
    // height: 410,
    // width: 260
  }
});

export default steelShitInstance;
