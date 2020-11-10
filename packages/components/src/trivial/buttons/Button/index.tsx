import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  AccessibilityState,
  View,
  GestureResponderEvent
} from 'react-native';

import { Theme, ButtonTheme, ButtonStyle } from 'rns-theme';

export interface ButtonBaseProps {
  onPress: (event: GestureResponderEvent) => void;
  style?: ButtonStyle;
  isDisabled?: boolean;
  accessibilityLabel?: string;
}

/**
 * Base button implementation
 */
export class Button extends React.PureComponent<ButtonBaseProps> {
  public render(): JSX.Element {
    const { accessibilityLabel, isDisabled, style, children } = this.props;

    const theme = style || ButtonTheme;

    const buttonStyle = isDisabled ? theme.buttonDisabled : theme.button;

    const accessibilityState: AccessibilityState = {};
    if (isDisabled) {
      accessibilityState.disabled = true;
    }

    if (
      Theme.platform.isWeb || // in Web TouchableNativeFeedback is not implemented yet in react-native-web
      Theme.platform.isIos
    ) {
      return (
        <TouchableOpacity
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="button"
          accessibilityState={accessibilityState}
          disabled={isDisabled}
          onPress={this.onButtonPressed}>
          <View style={buttonStyle}>{children}</View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableNativeFeedback
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        disabled={isDisabled}
        onPress={this.onButtonPressed}>
        <View style={buttonStyle}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  protected onButtonPressed = (event: GestureResponderEvent): void => {
    this.props.onPress(event);
  };
}
