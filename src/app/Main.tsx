import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ProductCard } from "./components/advanced/ProductCard";
import { Theme } from "./theme/Theme";
import { PlainText } from "./components/trivial/text/PlainText";

export default class Main extends PureComponent {
  private mainStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: Theme.platform.deviceWidth,
      height: Theme.platform.deviceHeight
    }
  });

  public render() {
    return (
      <View style={this.mainStyle.container}>
        <PlainText>
          The first page. {Theme.platform.deviceWidth}x
          {Theme.platform.deviceHeight}
        </PlainText>
        <PlainText>Russian: Аз есмь реакт натив аппликация...</PlainText>
        <ProductCard
          thumbnail="http://termokot.ru/wa-data/public/shop/products/55/35/3555/images/3128/3128.200x0.jpg"
          title="One &amp; Only (Ван&amp;Онли) Sterilized Cat для стерилизованных кошек с индейкой и рисом,2 кг"
          price={200.0}
        />
      </View>
    );
  }
}
