import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ui } from 'rns-packages';
import { DeliveryAddressId } from 'rns-types';

import { DeliveryCardsScreen } from './delivery-cards.screen';
import { UpdateDeliveryCardScreen } from './update-delivery-card.screen';

/**
 * Screen where user can manage delivery options
 *
 * @returns product page UI
 */
export const DeliverySelectorScreen: React.FC = () => {
  const [screenIndex, setSubScreen] = useState(0);
  const [cardId, setCardId] = useState<DeliveryAddressId>('');
  const dispatch = useDispatch();

  return (
    <>
      {screenIndex === 0 && (
        <DeliveryCardsScreen
          onClose={(): unknown => dispatch(ui.actionSetDeliveryManagerClose.start())}
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
