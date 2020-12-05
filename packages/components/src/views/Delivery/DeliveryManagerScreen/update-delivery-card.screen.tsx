import React, { ReactNode, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

import { translate } from 'localization';
import { RedDownButton, DeliveryScreenTheme, Theme } from 'rns-theme';

import { TopBar } from 'components/src/advanced/TopBar';
import { TextButton } from 'components/src/trivial/buttons/TextButton';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { CheckBox } from 'components/src/trivial/CheckBox';
import { Button } from '../../../trivial/buttons/Button';
import { Platform } from 'rns-theme/src/Platform';

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
  const [isBaseAddress, setIsBaseAddress] = useState(false);

  const isFormValid = (): boolean => {
    return !!name && !!phone && !!address1;
  };

  const textEditInput = (value: string, callback: (value: string) => void, placeholder: string): ReactNode => {
    return (
      <View style={{ marginTop: 10 }}>
        <TextInput
          style={[
            {
              height: 40,
              fontSize: 16,
              borderBottomWidth: StyleSheet.hairlineWidth * 1.5,
              borderBottomColor: Theme.middleGrey
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (Platform.isWeb && { outline: 'none' }) as any // currently there is no other way to remove outline from web version
          ]}
          maxLength={50}
          underlineColorAndroid="transparent"
          placeholder={translate(placeholder)}
          onChangeText={(value): void => callback(value)}
          defaultValue={value}
        />
      </View>
    );
  };

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
          {textEditInput(name, setName, 'Your name')}
          {textEditInput(phone, setPhone, 'Phone number')}
          {textEditInput(address1, setAddress1, 'Address1')}
          {textEditInput(address2, setAddress2, 'Address2')}
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
                borderColor: Theme.middleGrey,
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
          <Button onPress={(): unknown => setIsBaseAddress(!isBaseAddress)}>
            <View style={{ flexDirection: 'row', marginTop: 25 }}>
              <CheckBox
                value={isBaseAddress}
                style={{ alignSelf: 'center' }}
                tintColors={{ true: Theme.red, false: Theme.darkGreen }}
              />
              <StylableText style={{ marginLeft: 15 }}>{translate('Default delivery address')}</StylableText>
            </View>
          </Button>
          {!Platform.isWeb && (
            <View style={{ height: 25 }}>
              {/* Rrequired because when keyboard pops up on android scroll list cuts off last input */}
            </View>
          )}
        </ScrollView>
      </View>
      <View>
        <TextButton
          style={RedDownButton}
          isDisabled={!isFormValid()}
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
