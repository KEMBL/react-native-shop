import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CacheableImage } from "./components/trivial/CacheableImage";

export default class Main extends Component {
  public render() {
    return (
      <View style={styles.container}>
        <Text>The first page. Hello!</Text>
        <Text>Russian: Аз есмь реакт натив аппликация...</Text>
        <CacheableImage
          src="http://termokot.ru/wa-data/public/shop/products/55/35/3555/images/3128/3128.200x0.jpg"
          width={400}
          height={400}
        />
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
    color: "red"
  }
});
