import React from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';

import { DeliveryScreenTheme } from 'rns-theme';
import { ui } from 'rns-packages';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { TopBar } from 'components/src/advanced/TopBar';

/**
 * Screen where user can manage delivery options
 *
 * @returns product page UI
 */
export const DeliverySelectorScreen: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <View style={DeliveryScreenTheme.container}>
      <TopBar title="Shipment Address" onBack={(): unknown => dispatch(ui.actionSetCurrentProduct.start(0))}></TopBar>
      <View>
        <StylableText>DeliverySelectorScreen is shown</StylableText>
      </View>
    </View>
  );
};
