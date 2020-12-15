import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { delivery } from 'rns-packages';
import { translate } from 'localization';
import { RedDownButton, DeliveryScreenTheme } from 'rns-theme';

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
  const deliveryAddresses = useSelector(delivery.selectors.selectAddressesSorted);

  const cards = deliveryAddresses.map((a) => (
    <DeliveryAddressCard key={a.deliveryAddressId} id={a.deliveryAddressId}></DeliveryAddressCard>
  ));

  return (
    <View style={DeliveryScreenTheme.container}>
      <View style={DeliveryScreenTheme.cards}>
        <TopBar title={translate('Select shipment address')} onBack={onClose}>
          <PencilIcon />
        </TopBar>
        <ScrollView>
          {cards}
          <View style={{ height: 10 }} />
        </ScrollView>
      </View>
      <View>
        <TextButton style={RedDownButton} title={translate('Add shipment address')} onPress={onAddCard} />
      </View>
    </View>
  );
};

DeliveryCardsScreen.propTypes = {
  onAddCard: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
