import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (isLoaded) {
      navigation.navigate('Main');
    }
  }),
    [isLoaded];

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
