import React, { ReactNode, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { translate } from 'localization';
import { delivery } from 'rns-packages';
import { DeliveryInfo } from 'rns-types';
import { Platform, RedDownButton, DeliveryScreenTheme, Theme, FakeDisabledDownButton } from 'rns-theme';

import { TopBar } from 'components/src/advanced/TopBar';
import { TextButton } from 'components/src/trivial/buttons/TextButton';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { CheckBox } from 'components/src/trivial/CheckBox';
import { Button } from 'components/src/trivial/buttons/Button';
import { AlertIcon } from 'components/src/trivial/icons/Alert';

export interface UpdateDeliveryCardScreenProps {
  onClose: () => void;
}

/**
 * Interface for adding new selivery address
 */
export const UpdateDeliveryCardScreen: React.FC<UpdateDeliveryCardScreenProps> = (props) => {
  const { onClose } = props;
  const dispatch = useDispatch();
  const [clientName, setName] = useState('');
  const [isNameValid, setNameValid] = useState(true);
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [address1, setAddress1] = useState('');
  const [isAddress1Valid, setAddress1Valid] = useState(true);
  const [address2, setAddress2] = useState('');
  const [note, setNote] = useState('');
  const [noteFocused, setNoteFocused] = useState(false);
  const [isBaseAddress, setIsBaseAddress] = useState(false);
  const [isAlerIconsAllowed, setAlerIconsAllowed] = useState(false);

  const maxInputSymbols = 50;
  const isFormValid = (): boolean => {
    const nameCheck = !!clientName && clientName.length > 1 && clientName.length <= maxInputSymbols;
    if (nameCheck !== isNameValid) {
      setNameValid(nameCheck);
    }

    let phoneCheck = !!phone && phone.length > 6 && phone.length <= maxInputSymbols;
    if (phoneCheck) {
      const phoneRe = /^[+\-()\s,/0-9]*$/;
      phoneCheck = phoneRe.test(phone);
    }
    if (phoneCheck !== isPhoneValid) {
      setPhoneValid(phoneCheck);
    }

    const addressCheck = !!address1 && address1.length > 9 && address1.length <= maxInputSymbols;
    if (addressCheck !== isAddress1Valid) {
      setAddress1Valid(addressCheck);
    }

    return isNameValid && isPhoneValid && isAddress1Valid;
  };

  const textEditInput = (
    value: string,
    callback: (value: string) => void,
    placeholder: string,
    isValid = true
  ): ReactNode => {
    return (
      <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}>
        <View style={{ flexGrow: 1 }}>
          <TextInput
            style={[
              {
                height: 40,
                fontSize: 16,
                borderBottomWidth: StyleSheet.hairlineWidth * 1.5,
                borderBottomColor: isValid ? Theme.middleGrey : Theme.red
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (Platform.isWeb && { outline: 'none' }) as any // currently there is no other way to remove outline from web version
            ]}
            maxLength={maxInputSymbols}
            underlineColorAndroid="transparent"
            placeholder={translate(placeholder)}
            onChangeText={(value): void => callback(value)}
            defaultValue={value}
          />
        </View>
        {!isValid && isAlerIconsAllowed && (
          <View style={{ width: 24, justifyContent: 'flex-end', marginBottom: 5 }}>
            <AlertIcon color={Theme.red} />
          </View>
        )}
      </View>
    );
  };

  /** save field values */
  const onSave = (): void => {
    setAlerIconsAllowed(true);

    if (isFormValid()) {
      const deliveryInfo: DeliveryInfo = {
        clientName: clientName,
        phoneNumber: phone,
        address1: address1,
        address2: address2,
        note: note,
        isBaseAddress: isBaseAddress
      };

      // save results
      dispatch(delivery.actionSaveDeliveryAddress.start(deliveryInfo));
      // console.log('onClose');
      onClose();
    } else {
      console.log('onClose INVALID', isNameValid, isPhoneValid, isAddress1Valid);
    }
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
          {textEditInput(clientName, setName, 'Your name', isNameValid)}
          {textEditInput(phone, setPhone, 'Phone number', isPhoneValid)}
          {textEditInput(address1, setAddress1, 'Address1', isAddress1Valid)}
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
          style={isFormValid() ? RedDownButton : FakeDisabledDownButton}
          title={translate('Save shipment address')}
          onPress={onSave}
        />
      </View>
    </View>
  );
};

UpdateDeliveryCardScreen.propTypes = {
  onClose: PropTypes.func.isRequired
};
