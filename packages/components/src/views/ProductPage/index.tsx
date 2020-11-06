import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { View, StatusBar, ScrollView } from 'react-native';

import { PriceModel } from 'rns-types';
import { selectConfiguration, product, ui } from 'rns-packages';
import {
  steelSheetInstance as ItemPageTheme,
  variantsButtonHighlighted,
  variantsButton,
  amountButton,
  buyButton
} from 'rns-theme/src/theme/views/ProductPage';
import { CacheableImage } from 'components/src/trivial/CacheableImage';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { TextButton } from 'components/src/trivial/buttons/TextButton';
import { DataButton } from 'components/src/trivial/buttons/DataButton';
import { Hr } from 'components/src/trivial/hr';
import { ProductUtils } from 'components/src/utils';
import { AppContext } from 'components/src/context';
import { DeliverySelector } from 'components/src/advanced/DeliverySelector';
import { Button } from '../../trivial/buttons/Button';
import { ArrowLeftIcon } from '../../trivial/icons/arrows/ArrowLeft';

/**
 * Page with full information about the product
 *
 * @returns product page UI
 */
export const ProductPage: React.FC = () => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(-1);
  const [amount, setAmount] = useState(1);
  /**
   * This product has only one variant of the price
   */
  const [single, setSingle] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const configuration = useSelector(selectConfiguration, shallowEqual);
  const productData = useSelector(product.selectors.selectCurrentProduct, shallowEqual);
  const dispatch = useDispatch();

  if (!single && productData.price.properties.length === 1) {
    // if we have only one variant of
    setSingle(true);
    setIsSelected(true);
  }

  const onPriceButtonClick = (data: number): void => {
    if (single) {
      return;
    }
    const nextState = selectedVariantIndex === data ? -1 : data; // turn button on / off
    setSelectedVariantIndex(nextState);
    setIsSelected(nextState !== -1);
  };

  const priceButton = (index: number, property: string): JSX.Element => {
    const isHighlighted = single || selectedVariantIndex === index;
    const currentStyle = isHighlighted ? variantsButtonHighlighted : variantsButton;
    return (
      <DataButton<number> key={index} style={currentStyle} title={property} onClick={onPriceButtonClick} data={index} />
    );
  };

  const priceContainer = (priceModel: PriceModel): JSX.Element => {
    const buttons = priceModel.properties.map((p, index) => priceButton(index, ProductUtils.makeButtonTitle(p)));
    return <View style={ItemPageTheme.variantsContainer}>{buttons}</View>;
  };

  const onAmountIncrease = (): void => {
    setAmount(amount + 1);
  };

  const onAmountDecrease = (): void => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  return (
    <View style={ItemPageTheme.container}>
      <StatusBar backgroundColor={ItemPageTheme.statusBar.backgroundColor} barStyle="light-content" />
      <View style={ItemPageTheme.toolBar}>
        <Button onPress={(): unknown => dispatch(ui.actionSetCurrentProduct.start(0))}>
          <ArrowLeftIcon color="#FFF" width={22} />
        </Button>
      </View>
      <ScrollView style={{ height: 550 }}>
        <AppContext.Consumer>
          {({ imageCacherInterface }): JSX.Element => (
            <CacheableImage
              style={ItemPageTheme.image}
              src={productData.imageUrls[0]}
              imageCacheHoc={imageCacherInterface}
            />
          )}
        </AppContext.Consumer>
        <View style={ItemPageTheme.priceContainer}>
          <StylableText style={ItemPageTheme.price}>
            {ProductUtils.makePriceString(
              productData.price.properties,
              configuration.currency,
              configuration.priceError,
              selectedVariantIndex,
              amount
            )}
          </StylableText>
        </View>
        <View style={ItemPageTheme.infoContainer}>
          {priceContainer(productData.price)}
          <View style={ItemPageTheme.titleContainer}>
            <StylableText style={ItemPageTheme.title}>
              New Dog Cat Bowls Stainless Steel Travel Footprint Feeding One & Only (Ван & Онли) Sterilized Cat для
              стерилизованных кошек с индейкой и рисом
            </StylableText>
          </View>
          <Hr color="#dfdfdf" />
          {isSelected && (
            <View style={ItemPageTheme.amountContainer}>
              <StylableText style={ItemPageTheme.variantSelectedText}>Количество:</StylableText>
              <View style={ItemPageTheme.amountSelectorContainer}>
                <TextButton style={amountButton} title="-" onPress={onAmountDecrease} />
                <StylableText style={ItemPageTheme.amountSelectorText}>{amount}</StylableText>
                <TextButton style={amountButton} title="+" onPress={onAmountIncrease} />
              </View>
            </View>
          )}
          <DeliverySelector />
        </View>
        <View
          style={{
            height: 10
          }}
        />
      </ScrollView>
      <TextButton style={buyButton} title="ДОБАВИТЬ В КОРЗИНУ" onPress={(): null => null} />
    </View>
  );
};
