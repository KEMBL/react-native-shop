import React, { PureComponent } from "react";
import { StyleSheet, View, StatusBar, FlatList } from "react-native";

import { Theme } from "./../../theme/Theme";
import { CardsSection } from "../../components/advanced/CardsSection";
import { ProductCardModel } from "../../models/ProductCardModel";
import { TopDownGradient } from "../../components/trivial/icons/gradients/TopDownGradient";
import { ProductCategoryModel } from "../../models/ProductCategoryModel";

const card: ProductCardModel = {
  thumbnail:
    "http://termokot.ru/wa-data/public/shop/products/55/35/3555/images/3128/3128.200x0.jpg",
  title:
    "One &amp; Only (Ван&amp;Онли) Sterilized Cat для стерилизованных кошек с индейкой и рисом,2 кг",
  weight: 1.2,
  price: 200.0
};

const cards: ProductCardModel[] = [card, card, card, card];
const category: ProductCategoryModel = {
  title: "Recomended for you"
};

const categories: ProductCategoryModel[] = [
  category,
  category,
  category,
  category,
  category
];

export default class MainPage extends PureComponent {
  private mainStyle = StyleSheet.create({
    container: {
      backgroundColor: "skyblue",
      height: Theme.platform.deviceHeight
    }
  });

  public render() {
    return (
      <View style={this.mainStyle.container}>
        <StatusBar backgroundColor="#016C4C" barStyle="light-content" />
        <View style={{ height: 94, backgroundColor: "#01875F" }} />
        <View
          style={{
            height: 51,
            backgroundColor: "white"
          }}
        />
        <View
          style={{
            height: "100%",
            backgroundColor: "#EEEEEE",
            flex: 1
          }}
        >
          <TopDownGradient
            width={Theme.platform.deviceWidth}
            height={7}
            topColor="#BFBFBF"
            bottomColor="#EEEEEE"
          />
          <FlatList<ProductCategoryModel>
            data={categories}
            pagingEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCategory}
          />
        </View>
      </View>
    );
  }

  private keyExtractor = (_item: ProductCategoryModel, index: number) => {
    return index.toString();
  };

  private renderCategory = ({ item }: { item: ProductCategoryModel }) => {
    const { title } = item;
    return <CardsSection title={title} cards={cards} />;
  };
}
