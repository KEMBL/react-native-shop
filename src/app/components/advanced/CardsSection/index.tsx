import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";

import { default as CardsSectionTheme } from "./../../../theme/components/CardsSection";
import { ProductCard } from "../ProductCard";
import { ProductCardModel } from "../../../models/ProductCardModel";
import { Header3Text } from "../../trivial/text/Header3Text";

interface CardsSectionProps {
  title: string;
  cards: ProductCardModel[];
}

export class CardsSection extends PureComponent<CardsSectionProps> {
  public render() {
    const { title, cards } = this.props;
    return (
      <View style={CardsSectionTheme.container}>
        <View style={CardsSectionTheme.header}>
          <View>
            <Header3Text style={CardsSectionTheme.title}>{title}</Header3Text>
          </View>
          <View>
            <Header3Text>MORE</Header3Text>
          </View>
        </View>
        <View style={CardsSectionTheme.cardsRowContainer}>
          <FlatList<ProductCardModel>
            horizontal={true}
            data={cards}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={this.keyExtractor}
            contentContainerStyle={CardsSectionTheme.cardsRow}
            renderItem={this.renderCard}
          />
        </View>
      </View>
    );
  }

  private renderCard = ({ item }: { item: ProductCardModel }) => {
    return (
      <ProductCard
        thumbnail={item.thumbnail}
        title={item.title}
        price={item.price}
        weight={item.weight}
      />
    );
  };

  private keyExtractor = (_item: ProductCardModel, index: number) => {
    return index.toString();
  };
}
