import React, {PureComponent} from 'react';
import {View, StatusBar, ScrollView, GestureResponderEvent} from 'react-native';

import {
  steelShitInstance as ItemPageTheme,
  variantsButtonSelected,
  variantsButton,
  amountButton,
  buyButton,
} from '../../theme/views/ProductPage';
import {CacheableImage} from '../../components/trivial/CacheableImage';
import {StylableText} from '../../components/trivial/text/StylableText';
import {Button} from '../../components/trivial/buttons/Button';
import {DataButton} from '../../components/trivial/buttons/DataButton';
import {Hr} from '../../components/trivial/hr';
import {ProductModel, PriceModel} from '../../models/ProductModels';
import {PriceUtils} from '../../utils';

interface ProductPageProps {
  product: ProductModel;
}

interface ProductPageState {
  selectedVariantIndex?: number;
  amount: number;
}

export default class ProductPage extends PureComponent<
  ProductPageProps,
  ProductPageState
> {
  public state = {
    selectedVariantIndex: -1,
    amount: 1,
  };

  public render() {
    const {selectedVariantIndex, amount} = this.state;
    const product = this.props.product;
    return (
      <View style={ItemPageTheme.container}>
        <StatusBar
          backgroundColor={ItemPageTheme.statusBar.backgroundColor}
          barStyle="light-content"
        />
        <View style={ItemPageTheme.toolBar} />
        <ScrollView style={{height: 550}}>
          <CacheableImage
            style={ItemPageTheme.image}
            src={product.image_url[0]}
          />
          <View style={ItemPageTheme.priceContainer}>
            <StylableText style={ItemPageTheme.price}>
              {PriceUtils.makePriceString(
                product.price.properties,
                selectedVariantIndex,
                amount,
              )}
            </StylableText>
          </View>
          <View style={ItemPageTheme.infoContainer}>
            <StylableText style={ItemPageTheme.variantSelectedText}>
              Вес: 350гр
            </StylableText>
            {this.priceContainer(product.price)}
            {/* <View style={ItemPageTheme.variantsContainer}>
              <Button style={variantsButton} title="250гр" onPress={() => {}} />
              <Button
                style={variantsButtonSelected}
                title="350гр"
                onPress={() => {}}
              />
              <Button style={variantsButton} title="2кг" onPress={() => {}} />
              <Button style={variantsButton} title="7.5кг" onPress={() => {}} />
            </View> */}
            <View style={ItemPageTheme.titleContainer}>
              <StylableText style={ItemPageTheme.title}>
                New Dog Cat Bowls Stainless Steel Travel Footprint Feeding One &
                Only (Ван & Онли) Sterilized Cat для стерилизованных кошек с
                индейкой и рисом
              </StylableText>
            </View>
            <Hr color="#dfdfdf" />
            {selectedVariantIndex !== -1 && (
              <View style={ItemPageTheme.amountContainer}>
                <StylableText style={ItemPageTheme.variantSelectedText}>
                  Количество:
                </StylableText>
                <View style={ItemPageTheme.amountSelectorContainer}>
                  <Button
                    style={amountButton}
                    title="-"
                    onPress={this.onAmountDecrease}
                  />
                  <StylableText style={ItemPageTheme.amountSelectorText}>
                    {amount}
                  </StylableText>
                  <Button
                    style={amountButton}
                    title="+"
                    onPress={this.onAmountIncrease}
                  />
                </View>
              </View>
            )}
            <View style={ItemPageTheme.deliveryContainer}>
              <View style={{flexDirection: 'column'}}>
                <StylableText
                  style={{
                    fontFamily: 'sans-serif-condensed',
                    fontSize: 15,
                    color: 'black',
                  }}>
                  Доставка: 150 руб, 5 Мая
                </StylableText>
                <StylableText
                  style={{
                    fontFamily: 'sans-serif-condensed',
                    fontSize: 15,
                    color: 'black',
                    paddingBottom: 10,
                  }}>
                  г.Ростов-на-Дону, ул. Освобождения, ...
                </StylableText>
              </View>
              <StylableText
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 20,
                  color: 'black',
                  paddingBottom: 10,
                }}>
                >
              </StylableText>
            </View>
          </View>
          <View
            style={{
              height: 10,
            }}
          />
        </ScrollView>
        <Button
          style={buyButton}
          title="ДОБАВИТЬ В КОРЗИНУ"
          onPress={() => {}}
        />
      </View>
    );
  }

  private priceContainer = (priceModel: PriceModel) => {
    const buttons = priceModel.properties.map((p, index) =>
      this.priceButton(index, p.property),
    );

    return <View style={ItemPageTheme.variantsContainer}>{buttons}</View>;
  };

  private priceButton = (index: number, property: string) => {
    const isSelected = this.state.selectedVariantIndex === index;
    const currentStyle = isSelected ? variantsButtonSelected : variantsButton;
    return (
      <DataButton<number>
        // id={index}
        key={index}
        //        ref={this.buttonPriceeRef}
        style={currentStyle}
        title={property}
        onClick={this.onPriceButtonClick}
        data={index}
      />
    );
  };

  private onPriceButtonClick = (data: number, event: GestureResponderEvent) => {
    const nextState = this.state.selectedVariantIndex === data ? -1 : data; // turn button on / off
    this.setState(() => ({
      selectedVariantIndex: nextState,
    }));
  };

  private onAmountIncrease = () => {
    const nextAmount = this.state.amount + 1;
    this.setState(() => ({amount: nextAmount}));
  };
  private onAmountDecrease = () => {
    if (this.state.amount > 1) {
      this.setState(() => ({amount: this.state.amount - 1}));
    }
  };
}

/* <View style={ItemPageTheme.variantsContainer}>
{this.priceButtons()}
<Button style={variantsButton} title="250гр" onPress={() => {}} />
<Button
  style={variantsButtonSelected} 
  title="350гр"
  onPress={() => {}}
/>
<Button style={variantsButton} title="2кг" onPress={() => {}} />
<Button style={variantsButton} title="7.5кг" onPress={() => {}} />
</View> */

// import { Button as RNButton } from "react-native";
// export class Button1 extends React.PureComponent<{
//   data: number;
//   onPress: Function;
// }> {
//   // static defaultProps = {
//   //   onPress: () => {}
//   // }
//   // static propTypes = {
//   //   data: PropTypes.any,
//   //   onPress: PropTypes.func
//   // }
//   private onPress = () => {
//     this.props.onPress(this.props.data);
//   };
//   render() {
//     const { data, onPress, ...otherProps } = this.props;
//     return <RNButton {...otherProps} onPress={this.onPress} />;
//   }
// }
