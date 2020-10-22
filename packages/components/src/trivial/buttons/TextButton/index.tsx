import React from 'react';
import { Text } from 'react-native';

import { default as ButtonTheme } from 'rns-theme/src/theme/components/Button';
import { Button, ButtonBaseProps } from '../Button';

export interface ButtonProps extends ButtonBaseProps {
  title: string;
}

export class TextButton extends React.PureComponent<ButtonProps> {
  public render(): JSX.Element {
    const { accessibilityLabel, title, isDisabled, style, onPress } = this.props;

    const theme = style || ButtonTheme;
    const textStyle = isDisabled ? theme.textDisabled : theme.text;

    return (
      <Button onPress={onPress} style={style} isDisabled={isDisabled} accessibilityLabel={accessibilityLabel}>
        <Text style={textStyle} ellipsizeMode={'clip'} numberOfLines={1}>
          {title}
        </Text>
      </Button>
    );
  }
}
