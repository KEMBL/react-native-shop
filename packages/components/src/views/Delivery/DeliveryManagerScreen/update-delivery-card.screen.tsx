import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { translate } from 'localization';
import { buyButton, DeliveryScreenTheme } from 'rns-theme';

import { TopBar } from 'components/src/advanced/TopBar';
import { TextButton } from 'components/src/trivial/buttons/TextButton';

export interface UpdateDeliveryCardScreenProps {
  onClose: () => void;
}

/**
 * Interface for adding new selivery address
 */
export const UpdateDeliveryCardScreen: React.FC<UpdateDeliveryCardScreenProps> = (props) => {
  const { onClose } = props;
  return (
    <View style={DeliveryScreenTheme.container}>
      <View style={DeliveryScreenTheme.cards}>
        <TopBar title={translate('Add shipment address')} onBack={(): unknown => onClose()} />
        <View></View>
      </View>
      <View>
        <TextButton style={buyButton} title={translate('Save shipment address')} onPress={(): unknown => null} />
      </View>
    </View>
  );
};

UpdateDeliveryCardScreen.propTypes = {
  onClose: PropTypes.func.isRequired
};
