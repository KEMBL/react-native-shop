import React, {PureComponent} from 'react';
import {View} from 'react-native';

import {default as DeliverySelectorTheme} from './../../../theme/components/DeliverySelector';
import {StylableText} from '../../trivial/text/StylableText';
import {LocationIcon} from '../../trivial/icons/Location';

export class DeliverySelector extends PureComponent {
  public render() {
    return (
      <View style={DeliverySelectorTheme.container}>
        <LocationIcon />
        <View style={{flexDirection: 'column'}}>
          <StylableText
            style={{
              fontFamily: 'sans-serif-condensed',
              fontSize: 15,
              color: 'black',
            }}>
            Доставка: 150 руб, 5 Мая
          </StylableText>
          <StylableText
            style={{
              fontFamily: 'sans-serif-condensed',
              fontSize: 15,
              color: 'black',
              paddingBottom: 10,
            }}>
            г.Ростов-на-Дону, ул. Освобождения, ...
          </StylableText>
        </View>
        <StylableText
          style={{
            fontFamily: 'Roboto',
            fontSize: 20,
            color: 'black',
            paddingBottom: 10,
          }}>
          >
        </StylableText>
      </View>
    );
  }
}
