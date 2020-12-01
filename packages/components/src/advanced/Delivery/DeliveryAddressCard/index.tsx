import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { ui } from 'rns-packages';
import { DeliveryAddressCardTheme } from 'rns-theme';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { LocationIcon } from 'components/src/trivial/icons/Location';
import { Button } from 'components/src/trivial/buttons/Button';
import { DeliveryAddressId } from 'rns-types';

interface DeliveryAddressCardProps {
  id: DeliveryAddressId;
  isSelected?: boolean;
  isPickup?: boolean;
}

/**
 * One card with delivery or pickup information about single place
 */
export const DeliveryAddressCard: React.FC<DeliveryAddressCardProps> = (props): JSX.Element => {
  const dispatch = useDispatch();
  const { id, isSelected, isPickup } = props;
  return (
    <Button onPress={(): unknown => dispatch(ui.actionSetDeliveryAddress.start(id))}>
      <View style={DeliveryAddressCardTheme.container}>
        <View
          style={{
            display: isSelected || isPickup ? 'flex' : 'none',
            height: 19,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#6FFFCB',
              borderBottomRightRadius: 8
            }}>
            <StylableText
              style={{
                display: isSelected ? 'flex' : 'none',
                color: '#01875F',
                fontSize: 12, // WEB? +1 ??
                fontWeight: 'bold',
                paddingLeft: 10,
                paddingRight: 10
              }}>
              Заберу отсюда
            </StylableText>
          </View>
          <View
            style={{
              display: isPickup ? 'flex' : 'none',
              alignItems: 'center',
              backgroundColor: '#FF6B00',
              borderBottomLeftRadius: 8
            }}>
            <StylableText
              style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', paddingLeft: 10, paddingRight: 10 }}>
              Самовывоз
            </StylableText>
          </View>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10, display: 'flex', flexDirection: 'row' }}>
          <View style={{ paddingTop: 3, paddingRight: 5 }}>
            <LocationIcon />
          </View>
          <View>
            <StylableText style={{ fontSize: 13 }}>String1</StylableText>
            <StylableText style={{ fontSize: 13, fontWeight: 'bold' }}>String2</StylableText>
            <StylableText style={{ fontSize: 13, fontWeight: 'bold' }}>String3</StylableText>
            <StylableText style={{ fontSize: 13, fontWeight: 'bold', marginTop: 4 }}>String4</StylableText>
          </View>
        </View>
      </View>
    </Button>
  );
};

DeliveryAddressCard.propTypes = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isPickup: PropTypes.bool
};
