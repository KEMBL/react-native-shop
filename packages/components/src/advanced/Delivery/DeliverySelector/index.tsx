import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { translate } from 'localization';
import { delivery, ui } from 'rns-packages';
import { DeliverySelectorTheme } from 'rns-theme';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { LocationIcon } from 'components/src/trivial/icons/Location';
import { Button } from 'components/src/trivial/buttons/Button';

export const DeliverySelector: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const deliveryAddresses = useSelector(delivery.selectors.selectBaseDeliveryAddress);
  const deliveryAddress2 = deliveryAddresses && deliveryAddresses.address2 ? `${deliveryAddresses.address2}, ` : '';
  const deliveryAddressesMessage = deliveryAddresses ? `${deliveryAddresses.address1}, ${deliveryAddress2}...` : '...';

  const deliveryCost = useSelector(delivery.selectors.selectDeliveryCost);
  const deliverycostMEssage = deliveryCost ? `${deliveryCost} ${translate('rub')}, ` : '';

  //date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const month = tomorrow.getMonth() + 1;
  const monthStr = month < 10 ? `0${month}` : month;
  const dateMessage = `${tomorrow.getDate()}.${monthStr}.${tomorrow.getFullYear()}`;

  // concat everything
  const messageLine1 = `${translate('Delivery')}: ${deliverycostMEssage} ${dateMessage}`;
  const messageLine2 = deliveryAddressesMessage;

  return (
    <Button onPress={(): unknown => dispatch(ui.actionSetDeliveryManagerOpen.start())}>
      <View style={DeliverySelectorTheme.container}>
        <LocationIcon />
        <View style={{ flexDirection: 'column' }}>
          <StylableText
            style={{
              fontSize: 15,
              color: 'black'
            }}>
            {messageLine1}
          </StylableText>
          <StylableText
            style={{
              fontSize: 15,
              color: 'black',
              paddingBottom: 10
            }}>
            {messageLine2}
          </StylableText>
        </View>
        <StylableText
          style={{
            fontFamily: 'Roboto',
            fontSize: 20,
            color: 'black',
            paddingBottom: 10
          }}>
          &gt;
        </StylableText>
      </View>
    </Button>
  );
};
