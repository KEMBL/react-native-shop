import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { ui } from 'rns-packages';
import { default as DeliverySelectorTheme } from 'rns-theme/src/theme/components/DeliverySelector';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { LocationIcon } from 'components/src/trivial/icons/Location';
import { Button } from 'components/src/trivial/buttons/Button';

export const DeliverySelector: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <Button onPress={(): unknown => dispatch(ui.actionOpenDelivery.start())}>
      <View style={DeliverySelectorTheme.container}>
        <LocationIcon />
        <View style={{ flexDirection: 'column' }}>
          <StylableText
            style={{
              fontSize: 15,
              color: 'black'
            }}>
            Доставка: 150 руб, 5 Мая
          </StylableText>
          <StylableText
            style={{
              fontSize: 15,
              color: 'black',
              paddingBottom: 10
            }}>
            г.Ростов-на-Дону, ул. Освобождения, ...
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
