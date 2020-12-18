import React, { PureComponent } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { Theme } from 'rns-theme';

type EllipsizeMode = 'head' | 'middle' | 'tail' | 'clip';

export interface StylableTextProps {
  style?: TextStyle;
  wrapLines?: number;
}

export class StylableText extends PureComponent<StylableTextProps> {
  public static defaultProps: Partial<StylableTextProps> = {
    style: {
      fontFamily: Theme.fontFamily,
      color: Theme.textColor
    }
  };

  public render(): JSX.Element {
    const { style, wrapLines, children } = this.props;

    let combinedStyle: StyleProp<TextStyle> = StylableText.defaultProps.style;
    if (style) {
      combinedStyle = StyleSheet.compose(StylableText.defaultProps.style, style);
    }
    let numberOfLines = 0;
    let ellipsizeMode: EllipsizeMode = 'clip';
    if (wrapLines) {
      ellipsizeMode = 'tail';
      numberOfLines = wrapLines;
    }

    return (
      <Text
        style={combinedStyle}
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines || undefined}
        selectable={true}>
        {children}
      </Text>
    );
  }
}
