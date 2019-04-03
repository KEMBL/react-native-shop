import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Main extends Component {
  public render() {
    return (
      <View style={styles.container}>
        <Text>The first page. Hello!</Text>
        <Text>Russian: Аз есмь реакт натив аппликация!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "red",
  },
});
