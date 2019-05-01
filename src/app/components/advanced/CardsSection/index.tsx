import React, { PureComponent } from "react";
import { View } from "react-native";

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
    const { title, cards } = this.props;
    const productCards = cards.map((card, index) => (
      <ProductCard
        thumbnail={card.thumbnail}
        title={card.title}
        price={card.price}
        key={index}
      />
    ));
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
        <View style={CardsSectionTheme.cardsRow}>{productCards}</View>
      </View>
    );
  }
}
