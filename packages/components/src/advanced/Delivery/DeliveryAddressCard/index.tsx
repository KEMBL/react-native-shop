import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { DeliveryAddressId, DeliveryType } from 'rns-types';
import { delivery, utils } from 'rns-packages';
import { DeliveryAddressCardTheme, Theme } from 'rns-theme';
import { translate } from 'localization';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { LocationIcon } from 'components/src/trivial/icons/Location';
import { Button } from 'components/src/trivial/buttons/Button';

interface DeliveryAddressCardProps {
  id: DeliveryAddressId;
  onPress: () => void;
}

/**
 * One card with delivery or pickup information about single place
 */
export const DeliveryAddressCard: React.FC<DeliveryAddressCardProps> = (props): JSX.Element => {
  const { id, onPress } = props;
  const deliveryInfo = utils.useMemoizedSelectorWithParam(delivery.selectors.selectAddressById, id);

  if (!deliveryInfo) {
    return (
      <View style={DeliveryAddressCardTheme.container}>
        <StylableText
          style={{
            display: 'flex',
            color: Theme.red,
            fontSize: 16, // WEB? +1 ??
            fontWeight: 'bold',
            paddingLeft: 10,
            paddingRight: 10
          }}>
          Error: Unknown delivery address {id}
        </StylableText>
      </View>
    );
  }

  const isSelected = deliveryInfo.isBaseAddress;
  const isPickup = deliveryInfo.deliveryType === DeliveryType.pickup;
  const title = deliveryInfo.clientName;
  const phoneInfo = deliveryInfo.phoneNumber;
  const address1 = deliveryInfo.address1;
  const address2 = deliveryInfo.address2;
  const note = deliveryInfo.note;

  return (
    <Button onPress={onPress}>
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
              {isPickup ? translate('Pickup here') : translate('Delivery here')}
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
              {translate('Pickup')}
            </StylableText>
          </View>
        </View>
        <View style={{ marginLeft: 20, marginTop: 10, display: 'flex', flexDirection: 'row' }}>
          <View style={{ paddingTop: 3, paddingRight: 5 }}>
            <LocationIcon />
          </View>
          <View>
            <StylableText style={{ fontSize: 13 }}>{title}</StylableText>
            <StylableText style={{ fontSize: 13, fontWeight: 'bold' }}>
              {translate('ph')}
              {'. '}
              {phoneInfo}
            </StylableText>
            <StylableText style={{ fontSize: 13, fontWeight: 'bold' }}>{address1}</StylableText>
            {!!address2 && <StylableText style={{ fontSize: 13, fontWeight: 'bold' }}>{address2}</StylableText>}
            {!!note && <StylableText style={{ fontSize: 13, fontWeight: 'bold', marginTop: 4 }}>{note}</StylableText>}
          </View>
        </View>
      </View>
    </Button>
  );
};

DeliveryAddressCard.propTypes = {
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};
