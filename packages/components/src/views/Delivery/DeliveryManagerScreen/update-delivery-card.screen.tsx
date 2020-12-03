import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

import { translate } from 'localization';
import { RedDownButton, DeliveryScreenTheme, Theme } from 'rns-theme';

import { TopBar } from 'components/src/advanced/TopBar';
import { TextButton } from 'components/src/trivial/buttons/TextButton';
import { StylableText } from 'components/src/trivial/text/StylableText';

export interface UpdateDeliveryCardScreenProps {
  onClose: () => void;
}

/**
 * Interface for adding new selivery address
 */
export const UpdateDeliveryCardScreen: React.FC<UpdateDeliveryCardScreenProps> = (props) => {
  const { onClose } = props;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [note, setNote] = useState('');
  const [noteFocused, setNoteFocused] = useState(false);

  return (
    <View style={DeliveryScreenTheme.container}>
      <View style={DeliveryScreenTheme.cards}>
        <TopBar title={translate('Add shipment address')} onBack={(): unknown => onClose()} />
        <View>
          <View style={{ backgroundColor: '#FCFABF', height: 50, justifyContent: 'center' }}>
            <StylableText style={{ width: 240, alignSelf: 'center', textAlign: 'center' }}>
              {translate('The delivery is possible only within Rostov-on-Don')}
            </StylableText>
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              height: 42,
              justifyContent: 'center',
              backgroundColor: Theme.lightGrey
            }}>
            <StylableText
              style={{
                fontSize: 12,
                alignSelf: 'center',
                textAlign: 'center',
                color: Theme.middleGrey
              }}>
              {translate('Please, fill-in fields in Russian Language')}
            </StylableText>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            margin: 15,
            justifyContent: 'center'
          }}>
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                borderBottomWidth: StyleSheet.hairlineWidth * 1.5,
                borderBottomColor: Theme.middleGrey
              }}
              maxLength={50}
              underlineColorAndroid="transparent"
              placeholder={translate('Your name')}
              onChangeText={(value): void => setName(value)}
              defaultValue={name}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                borderBottomWidth: StyleSheet.hairlineWidth * 1.5,
                borderBottomColor: Theme.middleGrey
              }}
              maxLength={50}
              underlineColorAndroid="transparent"
              placeholder={translate('Phone number')}
              onChangeText={(value): void => setPhone(value)}
              defaultValue={phone}
            />
          </View>
          <View style={{ marginTop: 13 }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                borderBottomWidth: StyleSheet.hairlineWidth * 1.5,
                borderBottomColor: Theme.middleGrey
              }}
              maxLength={50}
              underlineColorAndroid="transparent"
              placeholder={translate('Address1')}
              onChangeText={(value): void => setAddress1(value)}
              defaultValue={address1}
            />
          </View>
          <View style={{ marginTop: 13 }}>
            <TextInput
              style={{
                height: 40,
                fontSize: 16,
                borderBottomWidth: StyleSheet.hairlineWidth * 1.5,
                borderBottomColor: Theme.middleGrey
              }}
              maxLength={50}
              underlineColorAndroid="transparent"
              placeholder={translate('Address2')}
              onChangeText={(value): void => setAddress2(value)}
              defaultValue={address2}
            />
          </View>
          <View style={{ marginTop: 13 }}>
            <StylableText
              style={{
                lineHeight: 40,
                fontSize: 16,
                borderBottomWidth: StyleSheet.hairlineWidth * 1.5,
                borderBottomColor: Theme.middleGrey
              }}>
              {translate('Rostov-on-Don')}
            </StylableText>
          </View>
          <View style={{ marginTop: 13 }}>
            <TextInput
              style={{
                height: 100,
                fontSize: 16,
                borderWidth: StyleSheet.hairlineWidth * 1.5,
                borderBottomColor: Theme.middleGrey,
                textAlign: note || noteFocused ? 'left' : 'center'
              }}
              maxLength={250}
              onFocus={(): void => setNoteFocused(true)}
              onBlur={(): void => setNoteFocused(false)}
              multiline
              underlineColorAndroid="transparent"
              placeholder={note || noteFocused ? '' : translate('note to a delivery man')}
              onChangeText={(value): void => setNote(value)}
              defaultValue={note}
            />
          </View>
        </ScrollView>
      </View>
      <View>
        <TextButton
          style={RedDownButton}
          isDisabled={true}
          title={translate('Save shipment address')}
          onPress={(): unknown => null}
        />
      </View>
    </View>
  );
};

UpdateDeliveryCardScreen.propTypes = {
  onClose: PropTypes.func.isRequired
};
