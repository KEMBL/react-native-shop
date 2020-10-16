import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View } from 'react-native';

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
        <PlainText>Loading...</PlainText>
      </View>
      {isError && (
        <View>
          <PlainText>Product loading Error!!!</PlainText>
        </View>
      )}
    </View>
  );
};
