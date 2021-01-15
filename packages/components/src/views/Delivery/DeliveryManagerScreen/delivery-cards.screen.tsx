import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { delivery } from 'rns-packages';
import { translate } from 'localization';
import { RedDownButton, DeliveryScreenTheme, Theme } from 'rns-theme';
import { DeliveryAddressId, DeliveryType } from 'rns-types';

import { Button } from 'components/src/trivial/buttons/Button';
import { TopBar } from 'components/src/advanced/TopBar';
import { DeliveryAddressCard } from 'components/src/advanced/Delivery';
import { PencilIcon } from 'components/src/trivial/icons/Pencil';
import { PlusIcon } from 'components/src/trivial/icons/Plus';
import { TextButton } from 'components/src/trivial/buttons/TextButton';
import { CheckBox } from 'components/src/trivial/CheckBox';

export interface DeliveryCardsScreenProps {
  onAddCard: () => void;
  onClose: () => void;
  onOpenCard: (id: DeliveryAddressId) => void;
}

/**
 * Screen where user can manage delivery options
 *
 * @returns product page UI
 */
export const DeliveryCardsScreen: React.FC<DeliveryCardsScreenProps> = (props) => {
  const { onAddCard, onClose, onOpenCard } = props;
  const deliveryAddresses = useSelector(delivery.selectors.selectAddressesSorted);
  const [isEdit, setIsEdit] = useState(false);

  const isCustomCardsExist = deliveryAddresses.some((c) => c.deliveryType === DeliveryType.delivery);
  const cards = deliveryAddresses
    .sort((a, b) => b.lastUsedAt?.getTime() - a.lastUsedAt?.getTime())
    .map((a) => {
      const card = <DeliveryAddressCard id={a.deliveryAddressId} isEdit={isEdit}></DeliveryAddressCard>;

      if (isEdit) {
        return (
          <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
            <CheckBox style={{ alignSelf: 'center' }} tintColors={{ true: Theme.red, false: Theme.darkGreen }} />
            <View style={{ display: 'flex', flexGrow: 1 }}>{card}</View>
          </View>
        );
      }

      return (
        <Button key={a.deliveryAddressId} onPress={() => onOpenCard(a.deliveryAddressId)}>
          {card}
        </Button>
      );
    });

  // onPress={(): void => onOpenCard(a.deliveryAddressId)}

  const onToggleEditMode = (): void => {
    setIsEdit(!isEdit);
    console.log(isEdit);
  };

  const onRemoveCards = (): void => {
    console.log('Remove');
  };

  return (
    <View style={DeliveryScreenTheme.container}>
      <View style={DeliveryScreenTheme.cards}>
        <TopBar title={translate('Select shipment address')} onBack={onClose}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {isCustomCardsExist && (
              <View style={{ marginRight: 15 }}>
                <Button onPress={onToggleEditMode}>
                  <PencilIcon />
                </Button>
              </View>
            )}
            {!isEdit && (
              <Button onPress={onAddCard}>
                <PlusIcon />
              </Button>
            )}
          </View>
        </TopBar>
        <ScrollView>
          {cards}
          <View style={{ height: 10 }} />
        </ScrollView>
      </View>
      <View>
        {isEdit ? (
          <TextButton style={RedDownButton} title={translate('Remove shipment address')} onPress={onRemoveCards} />
        ) : (
          <TextButton style={RedDownButton} title={translate('Add shipment address')} onPress={onAddCard} />
        )}
      </View>
    </View>
  );
};

DeliveryCardsScreen.propTypes = {
  onAddCard: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpenCard: PropTypes.func.isRequired
};
