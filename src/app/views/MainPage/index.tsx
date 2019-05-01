import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import { Theme } from "./../../theme/Theme";
import { PlainText } from "./../../components/trivial/text/PlainText";
import { CardsSection } from "../../components/advanced/CardsSection";
import { ProductCardModel } from "../../models/ProductCardModel";

const card: ProductCardModel = {
  thumbnail:
    "http://termokot.ru/wa-data/public/shop/products/55/35/3555/images/3128/3128.200x0.jpg",
  title:
    "One &amp; Only (Ван&amp;Онли) Sterilized Cat для стерилизованных кошек с индейкой и рисом,2 кг",
  price: 200.0
};
const cards: ProductCardModel[] = [card, card, card, card];

export default class MainPage extends PureComponent {
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
        <CardsSection title="Distributor name" cards={cards} />
      </View>
    );
  }
}

{
  /* <View style={this.mainStyle.container}>
  <PlainText>
    The first page. {Theme.platform.deviceWidth}x
    {Theme.platform.deviceHeight}
  </PlainText>
  <PlainText>Russian: Аз есмь реакт натив аппликация...</PlainText>
  <CardsSection></CardsSection>
  <ProductCard
    thumbnail="http://termokot.ru/wa-data/public/shop/products/55/35/3555/images/3128/3128.200x0.jpg"
    title="One &amp; Only (Ван&amp;Онли) Sterilized Cat для стерилизованных кошек с индейкой и рисом,2 кг"
    price={200.0}
  />
  </View> */
}
