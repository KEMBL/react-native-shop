import React from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';

import { translate } from 'localization';
import { buyButton, DeliveryScreenTheme } from 'rns-theme';
import { ui } from 'rns-packages';

import { TopBar } from 'components/src/advanced/TopBar';
import { DeliveryAddressCard } from 'components/src/advanced/Delivery';
import { PencilIcon } from 'components/src/trivial/icons/Pencil';
import { TextButton } from 'components/src/trivial/buttons/TextButton';

/**
 * Screen where user can manage delivery options
 *
 * @returns product page UI
 */
export const DeliverySelectorScreen: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <View style={DeliveryScreenTheme.container}>
      <View style={DeliveryScreenTheme.cards}>
        <TopBar
          title={translate('Select shipment address')}
          onBack={(): unknown => dispatch(ui.actionSetDeliveryManagerClose.start())}>
          <PencilIcon />
        </TopBar>
        <View>
          <DeliveryAddressCard id="string-id1" isSelected={true} isPickup={true}></DeliveryAddressCard>
          <DeliveryAddressCard id="string-id2" isSelected={true} isPickup={false}></DeliveryAddressCard>
          <DeliveryAddressCard id="string-id3" isSelected={false} isPickup={true}></DeliveryAddressCard>
          <DeliveryAddressCard id="string-id4" isSelected={false} isPickup={false}></DeliveryAddressCard>
        </View>
      </View>
      <View>
        <TextButton style={buyButton} title={translate('Add shopping address')} onPress={(): null => null} />
      </View>
    </View>
  );
};
