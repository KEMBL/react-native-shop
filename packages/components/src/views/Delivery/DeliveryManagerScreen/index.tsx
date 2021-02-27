import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { DeliveryAddressId } from 'rns-types';

import { DeliveryCardsScreen } from './delivery-cards.screen';
import { UpdateDeliveryCardScreen } from './update-delivery-card.screen';

/**
 * Screen where user can manage delivery options
 *
 * @returns product page UI
 */
export const DeliverySelectorScreen: React.FC = () => {
  const navigation = useNavigation();
  const [screenIndex, setSubScreen] = useState(0);
  const [cardId, setCardId] = useState<DeliveryAddressId>('');

  return (
    <>
      {screenIndex === 0 && (
        <DeliveryCardsScreen
          onClose={(): void => navigation.navigate('Products')}
          onAddCard={(): void => setSubScreen(1)}
          onOpenCard={(id: DeliveryAddressId): void => {
            setCardId(id);
            setSubScreen(1);
          }}
        />
      )}
      {screenIndex === 1 && (
        <UpdateDeliveryCardScreen
          cardId={cardId}
          onClose={(): void => {
            setCardId('');
            setSubScreen(0);
          }}
        />
      )}
    </>
  );
};
