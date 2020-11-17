import React from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';

import { translate } from 'localization';
import { DeliveryScreenTheme } from 'rns-theme';
import { ui } from 'rns-packages';

import { StylableText } from 'components/src/trivial/text/StylableText';
import { TopBar } from 'components/src/advanced/TopBar';
import { DeliveryAddressCard } from 'components/src/advanced/Delivery';

/**
 * Screen where user can manage delivery options
 *
 * @returns product page UI
 */
export const DeliverySelectorScreen: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <View style={DeliveryScreenTheme.container}>
      <TopBar
        title={translate('Shipment address')}
        onBack={(): unknown => dispatch(ui.actionSetDeliveryManagerClose.start())}></TopBar>
      <View>
        <DeliveryAddressCard id="string-id"></DeliveryAddressCard>
        <StylableText>DeliverySelectorScreen is shown</StylableText>
      </View>
    </View>
  );
};
