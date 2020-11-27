import React from 'react';
import { View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { TopBarTheme } from 'rns-theme';
import { Button } from 'components/src/trivial/buttons/Button';
import { ArrowLeftIcon } from 'components/src/trivial/icons/arrows/ArrowLeft';
import { StylableText } from 'components/src/trivial/text/StylableText';

export interface TopBarProps {
  title?: string;
  onBack: () => void;
  children?: React.ReactNode;
}

/**
 * Shows a top element which contains window's title, back arrow and context icons
 */
export const TopBar: React.FC<TopBarProps> = (props): JSX.Element => {
  const { title, onBack, children } = props;
  return (
    <View style={TopBarTheme.container}>
      <StatusBar backgroundColor={TopBarTheme.statusBar.backgroundColor} barStyle="light-content" />
      <View style={TopBarTheme.toolBar}>
        <View style={TopBarTheme.baseActions}>
          <View style={TopBarTheme.backIcon}>
            <Button onPress={onBack}>
              <ArrowLeftIcon />
            </Button>
          </View>
          <View style={TopBarTheme.titleContainer}>
            <StylableText style={TopBarTheme.title}>{title}</StylableText>
          </View>
        </View>
        <View style={TopBarTheme.childrenContainer}>{children}</View>
      </View>
    </View>
  );
};

TopBar.propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  children: PropTypes.object
};
