import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const deliveryAddresses = useSelector(delivery.selectors.selectAddressesSorted);
  const [isEdit, setIsEdit] = useState(false);
  const [itemsToDel, setItemsToDel] = useState(Array<DeliveryAddressId>());

  const isCustomCardsExist = deliveryAddresses.some((c) => c.deliveryType === DeliveryType.delivery);
  const cards = deliveryAddresses
    .sort((a, b) => b.lastUsedAt?.getTime() - a.lastUsedAt?.getTime())
    .map((a) => {
      const card = (
        <DeliveryAddressCard id={a.deliveryAddressId} showButtons={isEdit} onEdit={onOpenCard}></DeliveryAddressCard>
      );

      if (isEdit) {
        return (
          <View
            key={a.deliveryAddressId}
            style={{ display: 'flex', flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
            <CheckBox
              value={itemsToDel.some((i) => i === a.deliveryAddressId)}
              isDisabled={a.deliveryType === DeliveryType.pickup}
              style={{ alignSelf: 'center' }}
              tintColors={{ true: Theme.red, false: Theme.darkGreen }}
              onValueChange={(): void => changeDeleteItems(a.deliveryAddressId)}
            />
            <View style={{ display: 'flex', flexGrow: 1 }}>{card}</View>
          </View>
        );
      }

      return (
        <Button key={a.deliveryAddressId} onPress={(): void => onCardSelectedAsBase(a.deliveryAddressId)}>
          {card}
        </Button>
      );
    });

  const changeDeleteItems = (id: DeliveryAddressId): void => {
    const index = itemsToDel.findIndex((i) => i === id);
    if (index < 0) {
      setItemsToDel([...itemsToDel, id]);
    } else {
      itemsToDel.splice(index, 1);
      setItemsToDel([...itemsToDel]);
    }
  };

  const onToggleEditMode = (): void => {
    setIsEdit(!isEdit);
  };

  const onCardSelectedAsBase = (id: DeliveryAddressId): void => {
    dispatch(delivery.actionSetDefaultDeliveryAddress.start({ deliveryAddressId: id, isBaseAddress: true }));
    // todo: go back to the product page?
  };

  const onRemoveCards = (): void => {
    console.log('Remove');

    dispatch(delivery.actionDeleteDeliveryAddresses.start(itemsToDel));
  };

  return (
    <View style={DeliveryScreenTheme.container}>
      <View style={DeliveryScreenTheme.cards}>
        <TopBar title={translate('Select shipment address')} onBack={onClose}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {!isEdit && (
              <View style={{ marginRight: 15 }}>
                <Button onPress={onAddCard}>
                  <PlusIcon />
                </Button>
              </View>
            )}
            {isCustomCardsExist && (
              <Button onPress={onToggleEditMode}>
                <PencilIcon />
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
          <TextButton
            style={RedDownButton}
            title={translate('Remove shipment address')}
            onPress={onRemoveCards}
            isDisabled={itemsToDel.length === 0}
          />
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
