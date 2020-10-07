import React from 'react';
import { StyleSheet, View, StatusBar, FlatList } from 'react-native';

import { ProductCategoryModel, ProductCategoryModelWithProducts, selectCurrentCategoryCategories } from 'rns-packages';
import { TopDownGradient } from 'components/src/trivial/icons/gradients/TopDownGradient';
import { Theme } from 'rns-theme/src/theme/Theme';
import { CardsSection } from '../../components/advanced/CardsSection';
import { ProductCardModel } from '../../models/Product/ProductCardModel';
import { shallowEqual, useSelector } from 'react-redux';
import { PriceUtils } from '../../../app/utils';

const keyExtractor = (_item: ProductCategoryModel, index: number): string => {
  return index.toString();
};

const renderCategory = ({ item }: { item: ProductCategoryModelWithProducts }): JSX.Element => {
  const { title, products } = item;
  const cards: ProductCardModel[] = products
    ? products.map<ProductCardModel>((value) => {
        return {
          thumbnail: value.imageUrls[0],
          title: value.name,
          weight: 1.2,
          price: PriceUtils.makePriceString(value.price.properties)
        };
      })
    : [];
  return <CardsSection title={title} cards={cards} />;
};

/**
 * Shows products inside given category
 *
 * @returns {object} see description
 */
export const ProductsListScreen: React.FC = () => {
  const categories = useSelector(selectCurrentCategoryCategories, shallowEqual);

  const mainStyle = StyleSheet.create({
    container: {
      backgroundColor: 'skyblue',
      height: Theme.platform.deviceHeight
    }
  });

  return (
    <View style={mainStyle.container}>
      <StatusBar backgroundColor="#016C4C" barStyle="light-content" />
      <View style={{ height: 94, backgroundColor: '#01875F' }} />
      <View
        style={{
          height: 51,
          backgroundColor: 'white'
        }}
      />
      <View
        style={{
          height: '100%',
          backgroundColor: '#EEEEEE',
          flex: 1
        }}>
        <TopDownGradient width={Theme.platform.deviceWidth} height={7} topColor="#BFBFBF" bottomColor="#EEEEEE" />
        <FlatList<ProductCategoryModelWithProducts>
          data={categories}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderCategory}
        />
      </View>
    </View>
  );
};
