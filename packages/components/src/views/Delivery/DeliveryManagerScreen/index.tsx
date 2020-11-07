import React from 'react';
import { useDispatch } from 'react-redux';
import { View, StatusBar } from 'react-native';

import { ui } from 'rns-packages';
import { steelSheetInstance as ItemPageTheme } from 'rns-theme/src/theme/views/ProductPage';
import { Button } from 'components/src/trivial/buttons/Button';
import { ArrowLeftIcon } from 'components/src/trivial/icons/arrows/ArrowLeft';
import { StylableText } from 'components/src/trivial/text/StylableText';

/**
 * Screen where user can manage delivery options
 *
 * @returns product page UI
 */
export const DeliverySelectorScreen: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <View style={ItemPageTheme.container}>
      <StatusBar backgroundColor={ItemPageTheme.statusBar.backgroundColor} barStyle="light-content" />
      <View style={ItemPageTheme.toolBar}>
        <Button onPress={(): unknown => dispatch(ui.actionSetCurrentProduct.start(0))}>
          <ArrowLeftIcon color="#FFF" width={22} />
        </Button>
      </View>
      <View style={ItemPageTheme.priceContainer}>
        <StylableText>DeliverySelectorScreen is shown</StylableText>
      </View>
    </View>
  );
};
