import React from 'react';
import {View} from 'react-native';

import {PlainText} from 'components/src/trivial/text/PlainText';

interface InitialLoadingPageProps {
  isError?: boolean;
}

export const InitialLoadingPage: React.FC<InitialLoadingPageProps> = ({
  isError
}) => {
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
