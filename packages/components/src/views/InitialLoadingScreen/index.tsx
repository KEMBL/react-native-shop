import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View } from 'react-native';

import { translate } from 'localization';
import { PlainText } from 'components/src/trivial/text/PlainText';
import { NavigationStackParamList } from 'rns-types';

export const InitialLoadingScreen: React.FC = () => {
  type InitialLoadingScreenRouteProp = RouteProp<NavigationStackParamList, 'Loading'>;

  // const navigation1 = useNavigation<InitialLoadingScreenNavigationProp>();
  const route = useRoute<InitialLoadingScreenRouteProp>();
  const { isError } = route.params;
  return (
    <View>
      <View>
        <PlainText>{translate('Loading')}...</PlainText>
      </View>
      {isError && (
        <View>
          <PlainText>{translate('Product loading Error')}!!!</PlainText>
        </View>
      )}
    </View>
  );
};
