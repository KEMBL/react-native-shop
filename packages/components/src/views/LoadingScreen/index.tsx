import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { translate } from 'localization';
import { isBootUpCompleted, isBootUpFailed } from 'rns-packages';

import { PlainText } from 'components/src/trivial/text/PlainText';

export const LoadingScreen: React.FC = () => {
  const navigation = useNavigation();
  const isLoaded = useSelector(isBootUpCompleted);
  const isLoadingError = useSelector(isBootUpFailed);

  useLayoutEffect(() => {
    if (isLoaded) {
      navigation.navigate('Main');
    }
  }),
    [isLoaded];

  if (isLoaded) {
    return null; // as user will be bypassed to Main it is not required to render the current page
  }

  return (
    <View>
      <View>
        <PlainText>{translate('Loading')}...</PlainText>
      </View>
      {isLoadingError && (
        <View>
          <PlainText>{translate('Product loading Error')}!!!</PlainText>
        </View>
      )}
    </View>
  );
};
