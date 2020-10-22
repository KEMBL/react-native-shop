import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';

import { default as CardsSectionTheme } from 'rns-theme/src/theme/components/CardsSection';
import { ButtonStyle } from 'rns-theme/src/theme/components/Button';
import { Header3Text } from 'components/src/trivial/text/Header3Text';
import { TextButton } from 'components/src/trivial/buttons/TextButton';

import { ProductCard } from 'components/src/advanced/ProductCard';
import { ProductCardModel } from './types';

interface CardsSectionProps {
  title: string;
  cards: ProductCardModel[];
}

interface CardsSectionState {
  isHorisontal: boolean;
}

/**
 * Renders a set of product cards
 */
export class CardsSection extends PureComponent<CardsSectionProps, CardsSectionState> {
  public state = {
    isHorisontal: true
  };

  public buttonStyle: ButtonStyle = {
    button: CardsSectionTheme.buttonMoreView,
    buttonDisabled: {},
    text: CardsSectionTheme.buttonMoreText,
    textDisabled: {}
  };

  public render(): JSX.Element {
    const { title, cards } = this.props;
    const { isHorisontal } = this.state;

    return (
      <View style={CardsSectionTheme.container}>
        <View style={CardsSectionTheme.headerContainer}>
          <View style={CardsSectionTheme.header}>
            <View>
              <Header3Text style={CardsSectionTheme.title}>{title}</Header3Text>
            </View>
            <TextButton onPress={this.onLayoutChanged} title="MORE" style={this.buttonStyle} />
          </View>
        </View>
        <View style={CardsSectionTheme.cardsRowContainer}>
          <FlatList<ProductCardModel>
            horizontal={isHorisontal}
            data={cards}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCard}
          />
        </View>
      </View>
    );
  }

  /**
   * Renders one card
   *
   * @param item product info
   * @param item.item product type definition
   *
   * @returns elemet
   */
  private renderCard = ({ item }: { item: ProductCardModel }): JSX.Element => {
    return (
      <ProductCard id={item.id} thumbnail={item.thumbnail} title={item.title} price={item.price} weight={item.weight} />
    );
  };

  private keyExtractor = (_item: ProductCardModel, index: number): string => {
    return index.toString();
  };

  private onLayoutChanged = (): void => {
    this.setState((prevState) => ({ isHorisontal: !prevState.isHorisontal }));
  };
}
