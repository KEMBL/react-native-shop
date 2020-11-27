import { StylableText } from 'components/src/trivial/text/StylableText';
import React from 'react';

import { ButtonTheme } from 'rns-theme';
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
        <StylableText style={textStyle}>{title}</StylableText>
      </Button>
    );
  }
}
