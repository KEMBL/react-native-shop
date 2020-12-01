import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { translate } from 'localization';
import { buyButton, DeliveryScreenTheme } from 'rns-theme';

import { TopBar } from 'components/src/advanced/TopBar';
import { DeliveryAddressCard } from 'components/src/advanced/Delivery';
import { PencilIcon } from 'components/src/trivial/icons/Pencil';
import { TextButton } from 'components/src/trivial/buttons/TextButton';

export interface DeliveryCardsScreenProps {
  onAddCard: () => void;
  onClose: () => void;
}

/**
 * Screen where user can manage delivery options
 *
 * @returns product page UI
 */
export const DeliveryCardsScreen: React.FC<DeliveryCardsScreenProps> = (props) => {
  const { onAddCard, onClose } = props;

  return (
    <View style={DeliveryScreenTheme.container}>
      <View style={DeliveryScreenTheme.cards}>
        <TopBar title={translate('Select shipment address')} onBack={onClose}>
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
        <TextButton style={buyButton} title={translate('Add shipment address')} onPress={onAddCard} />
      </View>
    </View>
  );
};

DeliveryCardsScreen.propTypes = {
  onAddCard: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
