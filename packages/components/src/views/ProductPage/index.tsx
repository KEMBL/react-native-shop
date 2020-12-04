import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { View, ScrollView } from 'react-native';

import { translate } from 'localization';
import { PriceModel } from 'rns-types';
import {
  Theme,
  ProductPageTheme,
  variantsButtonHighlighted,
  variantsButton,
  amountButton,
  RedDownButton
} from 'rns-theme';
import { selectConfiguration, product, ui } from 'rns-packages';

import { CacheableImage } from 'components/src/trivial/CacheableImage';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { TextButton } from 'components/src/trivial/buttons/TextButton';
import { DataButton } from 'components/src/trivial/buttons/DataButton';
import { Hr } from 'components/src/trivial/hr';
import { ProductUtils } from 'components/src/utils';
import { AppContext } from 'components/src/context';
import { DeliverySelector } from 'components/src/advanced/Delivery';
import { TopBar } from 'components/src/advanced/TopBar';

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
    return <View style={ProductPageTheme.variantsContainer}>{buttons}</View>;
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
    <View style={ProductPageTheme.container}>
      <TopBar
        title={translate('Product description')}
        onBack={(): unknown => dispatch(ui.actionSetCurrentProduct.start(0))}
      />
      <ScrollView style={{ height: 550 }}>
        <AppContext.Consumer>
          {({ imageCacherInterface }): JSX.Element => (
            <CacheableImage
              style={ProductPageTheme.image}
              src={productData.imageUrls[0]}
              imageCacheHoc={imageCacherInterface}
            />
          )}
        </AppContext.Consumer>
        <View style={ProductPageTheme.priceContainer}>
          <StylableText style={ProductPageTheme.price}>
            {ProductUtils.makePriceString(
              productData.price.properties,
              configuration.currency,
              configuration.priceError,
              selectedVariantIndex,
              amount
            )}
          </StylableText>
        </View>
        <View style={ProductPageTheme.infoContainer}>
          {priceContainer(productData.price)}
          <View style={ProductPageTheme.titleContainer}>
            <StylableText style={ProductPageTheme.title}>
              New Dog Cat Bowls Stainless Steel Travel Footprint Feeding One & Only (Ван & Онли) Sterilized Cat для
              стерилизованных кошек с индейкой и рисом
            </StylableText>
          </View>
          <Hr style={{ borderBottomColor: Theme.middleGrey, margin: 10 }} />
          {isSelected && (
            <View style={ProductPageTheme.amountContainer}>
              <StylableText style={ProductPageTheme.variantSelectedText}>{translate('Amount')}:</StylableText>
              <View style={ProductPageTheme.amountSelectorContainer}>
                <TextButton style={amountButton} title="-" onPress={onAmountDecrease} />
                <StylableText style={ProductPageTheme.amountSelectorText}>{amount}</StylableText>
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
      <TextButton style={RedDownButton} title={translate('add to basket')} onPress={(): null => null} />
    </View>
  );
};
