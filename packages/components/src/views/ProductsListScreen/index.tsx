import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { StyleSheet, View, StatusBar, FlatList } from 'react-native';

import { Configuration, ProductCategoryModel, ProductCategoryModelWithProducts } from 'rns-types';
import { selectConfiguration, category } from 'rns-packages';
import { Theme } from 'rns-theme';

import { TopDownGradient } from 'components/src/trivial/icons/gradients/TopDownGradient';
import { ProductUtils } from 'components/src/utils';
import { CardsSection, ProductCardModel } from 'components/src/advanced/CardsSection';

const keyExtractor = (_item: ProductCategoryModel, index: number): string => {
  return index.toString();
};

/**
 * Prepares inforrmation about each product card before send it cards renderer for a given category
 *
 * @param item category with products
 * @param configuration additional params
 *
 * @returns block which contains items from one category
 */
const renderCategory = (item: ProductCategoryModelWithProducts, configuration: Configuration): JSX.Element => {
  const { title, products } = item;
  const cards: ProductCardModel[] = products
    ? products.map<ProductCardModel>((value) => {
        if (!value) {
          // eslint-disable-next-line no-console
          console.error('undefined product cart value!', item);
          return {
            id: 0,
            thumbnail: '',
            title: 'Error cart',
            units: configuration.amountError,
            price: configuration.priceError
          };
        }

        let imageUrl = '';
        if (!value.imageUrls) {
          // eslint-disable-next-line no-console
          console.error('undefined imageUrls', value);
          imageUrl = '';
        } else {
          imageUrl = value.imageUrls[0];
        }

        return {
          id: value.id,
          thumbnail: imageUrl,
          title: ProductUtils.cleanTitle(value.name),
          units: ProductUtils.makeSimpleAmountString(value.price.properties, configuration.amountError),
          price: ProductUtils.makeMinPriceString(
            value.price.properties,
            configuration.currency,
            configuration.priceError
          )
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
  const configuration = useSelector(selectConfiguration, shallowEqual);
  const categories = useSelector(category.selectCurrentCategoryCategories, shallowEqual);
  // console.log('categories', categories);
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
        <TopDownGradient width="100%" height={7} topColor="#BFBFBF" bottomColor="#EEEEEE" />
        <FlatList<ProductCategoryModelWithProducts>
          data={categories}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={({ item }): JSX.Element => renderCategory(item, configuration)}
        />
      </View>
    </View>
  );
};
