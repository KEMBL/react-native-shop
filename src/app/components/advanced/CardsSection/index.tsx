import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";

import { default as CardsSectionTheme } from "./../../../theme/components/CardsSection";
import { PlainText } from "../../trivial/text/PlainText";
import { ProductCard } from "../ProductCard";
import { ProductCardModel } from "../../../models/ProductCardModel";

interface CardsSectionProps {
  title: string;
  cards: ProductCardModel[];
}

export class CardsSection extends PureComponent<CardsSectionProps> {
  public render() {
    const { title, cards: items } = this.props;
    return (
      <View style={CardsSectionTheme.container}>
        <View style={CardsSectionTheme.header}>
          <View>
            <PlainText style={CardsSectionTheme.title}>{title}</PlainText>
          </View>
          <View>
            <PlainText>More</PlainText>
          </View>
        </View>
        <FlatList<ProductCardModel>
          horizontal={true}
          data={items}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={CardsSectionTheme.cardsRow}
          renderItem={this.renderCard}
        />
      </View>
    );
  }

  private renderCard = ({ item }: { item: ProductCardModel }) => { 
    return (
      <ProductCard
        thumbnail={item.thumbnail}
        title={item.title}
        price={item.price}
      />
    );
  };

  private keyExtractor = (_item: ProductCardModel, index: number) => {
    return index.toString(); 
  };
}
