import React, { ReactNode, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { translate } from 'localization';
import { delivery, utils, debug as Debug } from 'rns-packages';
import { DeliveryAddressId, DeliveryInfoAdd, DeliveryType } from 'rns-types';
import { Platform, RedDownButton, DeliveryScreenTheme, Theme, FakeDisabledDownButton } from 'rns-theme';

import { TopBar } from 'components/src/advanced/TopBar';
import { TextButton } from 'components/src/trivial/buttons/TextButton';
import { StylableText } from 'components/src/trivial/text/StylableText';
import { CheckBox } from 'components/src/trivial/CheckBox';
import { Button } from 'components/src/trivial/buttons/Button';
import { AlertIcon } from 'components/src/trivial/icons/Alert';

const debug = Debug.debug('app:component:UpdateDeliveryCardScreen');

export interface UpdateDeliveryCardScreenProps {
  onClose: () => void;
  cardId?: DeliveryAddressId;
}

/**
 * Interface for adding new selivery address
 */
export const UpdateDeliveryCardScreen: React.FC<UpdateDeliveryCardScreenProps> = (props) => {
  const { onClose, cardId } = props;
  const dispatch = useDispatch();
  const deliveryInfo = cardId
    ? utils.useMemoizedSelectorWithParam(delivery.selectors.selectAddressById, cardId)
    : undefined;
  const isPickup = deliveryInfo ? deliveryInfo.deliveryType === DeliveryType.pickup : false;
  const [clientName, setName] = useState(deliveryInfo?.clientName ?? '');
  const [isNameValid, setNameValid] = useState(true);
  const [phone, setPhone] = useState(
    deliveryInfo?.phoneNumber ? `${translate('ph')}. ${deliveryInfo?.phoneNumber}` : ''
  );
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [address1, setAddress1] = useState(deliveryInfo?.address1 ?? '');
  const [isAddress1Valid, setAddress1Valid] = useState(true);
  const [address2, setAddress2] = useState(deliveryInfo?.address2 ?? '');
  const [note, setNote] = useState(deliveryInfo?.note ?? '');
  const [noteFocused, setNoteFocused] = useState(false);
  const [isBaseAddress, setIsBaseAddress] = useState(deliveryInfo?.isBaseAddress ?? false);
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
    if (isPickup && !value) {
      return <></>;
    }

    return (
      <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row' }}>
        <View style={{ flexGrow: 1 }}>
          {isPickup && (
            <StylableText
              style={{
                height: 40,
                fontSize: 16,
                borderBottomWidth: StyleSheet.hairlineWidth * 1.5,
                borderBottomColor: Theme.middleGrey
              }}>
              {value}
            </StylableText>
          )}
          {!isPickup && (
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
          )}
        </View>
        {!isPickup && !isValid && isAlerIconsAllowed && (
          <View style={{ width: 24, justifyContent: 'flex-end', marginBottom: 5 }}>
            <AlertIcon color={Theme.red} />
          </View>
        )}
      </View>
    );
  };

  /** save field values */
  const onSave = (): void => {
    if (isPickup) {
      dispatch(delivery.actionUpdateDeliveryPickupAddress.start({ deliveryAddressId: cardId!, isBaseAddress }));
      // console.log('onClose');
      onClose();
      return;
    }

    setAlerIconsAllowed(true);
    if (isFormValid()) {
      const deliveryInfo: DeliveryInfoAdd = {
        clientName: clientName,
        phoneNumber: phone,
        address1: address1,
        address2: address2,
        note: note,
        isBaseAddress: isBaseAddress
      };

      if (cardId) {
        dispatch(delivery.actionUpdateDeliveryAddress.start({ ...deliveryInfo, deliveryAddressId: cardId }));
      } else {
        dispatch(delivery.actionAddDeliveryAddress.start(deliveryInfo));
      }

      onClose();
      return;
    }

    debug('onClose called for INVALID form', isNameValid, isPhoneValid, isAddress1Valid);
  };

  return (
    <View style={DeliveryScreenTheme.container}>
      <View style={DeliveryScreenTheme.cards}>
        <TopBar title={translate(isPickup ? 'Pickup address' : 'Add shipment address')} onBack={onClose} />
        <View>
          <View style={{ backgroundColor: '#FCFABF', height: 50, justifyContent: 'center' }}>
            <StylableText style={{ width: 240, alignSelf: 'center', textAlign: 'center' }}>
              {translate(
                isPickup
                  ? 'You can pickup items at address below'
                  : 'The delivery is possible only within Rostov-on-Don'
              )}
            </StylableText>
          </View>
        </View>
        {!isPickup && (
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
        )}
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
            {isPickup && (
              <StylableText
                style={{
                  height: 100,
                  fontSize: 16,
                  borderWidth: StyleSheet.hairlineWidth * 1.5,
                  borderColor: Theme.middleGrey,
                  textAlign: note || noteFocused ? 'left' : 'center'
                }}>
                {note}
              </StylableText>
            )}
            {!isPickup && (
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
            )}
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
  cardId: PropTypes.string,
  onClose: PropTypes.func.isRequired
};
