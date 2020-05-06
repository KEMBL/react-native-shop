import React from 'react';
import {StyleSheet, View, StatusBar, FlatList} from 'react-native';

import {TopDownGradient} from 'components/src/trivial/icons/gradients/TopDownGradient';
import {Theme} from 'rns-theme/src/theme/Theme';
import {CardsSection} from '../../components/advanced/CardsSection';
import {ProductCardModel} from '../../models/Product/ProductCardModel';
import {ProductCategoryModel} from '../../models/Product/ProductCategoryModel';

const card: ProductCardModel = {
  thumbnail:
    'http://termokot.ru/wa-data/public/shop/products/55/35/3555/images/3128/3128.200x0.jpg',
  title:
    'One & Only (Ван & Онли) Sterilized Cat для стерилизованных кошек с индейкой и рисом,2 кг',
  weight: 1.2,
  price: 200.0
};

const cards: ProductCardModel[] = [card, card, card, card];
const category: ProductCategoryModel = {
  title: 'Recomended for you' // goods from the previous orders?
};

const categories: ProductCategoryModel[] = [
  category,
  category,
  category,
  category,
  category
];

const keyExtractor = (_item: ProductCategoryModel, index: number): string => {
  return index.toString();
};

const renderCategory = ({item}: {item: ProductCategoryModel}): JSX.Element => {
  const {title} = item;
  return <CardsSection title={title} cards={cards} />;
};

export const ProductsListScreen: React.FC = () => {
  //export default class ProductsListScreen extends PureComponent {
  const mainStyle = StyleSheet.create({
    container: {
      backgroundColor: 'skyblue',
      height: Theme.platform.deviceHeight
    }
  });

  return (
    <View style={mainStyle.container}>
      <StatusBar backgroundColor="#016C4C" barStyle="light-content" />
      <View style={{height: 94, backgroundColor: '#01875F'}} />
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
          keyExtractor={keyExtractor}
          renderItem={renderCategory}
        />
      </View>
    </View>
  );
};
