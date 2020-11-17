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
}

export const DeliveryAddressCard: React.FC<DeliveryAddressCardProps> = (props): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <Button onPress={(): unknown => dispatch(ui.actionSetDeliveryAddress.start(props.id))}>
      <View style={DeliveryAddressCardTheme.container}>
        <LocationIcon />
        <View style={{ flexDirection: 'column' }}>
          <StylableText>DELIVERY CARD </StylableText>
        </View>
      </View>
    </Button>
  );
};

DeliveryAddressCard.propTypes = {
  id: PropTypes.string.isRequired
};
