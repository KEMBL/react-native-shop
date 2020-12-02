import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ui } from 'rns-packages';

import { DeliveryCardsScreen } from './delivery-cards.screen';
import { UpdateDeliveryCardScreen } from './update-delivery-card.screen';

/**
 * Screen where user can manage delivery options
 *
 * @returns product page UI
 */
export const DeliverySelectorScreen: React.FC = () => {
  const [screenIndex, setSubScreen] = useState(0);
  const dispatch = useDispatch();

  return (
    <>
      {screenIndex === 0 && (
        <DeliveryCardsScreen
          onClose={(): unknown => dispatch(ui.actionSetDeliveryManagerClose.start())}
          onAddCard={(): void => setSubScreen(1)}
        />
      )}
      {screenIndex === 1 && <UpdateDeliveryCardScreen onClose={(): unknown => setSubScreen(0)} />}
    </>
  );
};
