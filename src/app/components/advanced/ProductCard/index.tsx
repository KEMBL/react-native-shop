import React, { PureComponent } from "react";
import { View } from "react-native";

import { default as ProductCardTheme } from "./../../../theme/components/ProductCard";
import { CacheableImage } from "./../../trivial/CacheableImage";
import { PlainText } from "../../trivial/text/PlainText";

interface ProductCardProps {
  thumbnail: string;
  title: string;
  price: number;
}

export class ProductCard extends PureComponent<ProductCardProps> {
  public render() {
    const { thumbnail, title, price } = this.props;
    return (
      <View style={ProductCardTheme.container}>
        <CacheableImage style={ProductCardTheme.image} src={thumbnail} />
        <PlainText style={ProductCardTheme.title} wrapLines={0}>
          {title}
        </PlainText>
        <PlainText style={ProductCardTheme.price}>RUB {price}</PlainText>
      </View>
    );
  }
}
