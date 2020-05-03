import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  AccessibilityState,
  Text,
  View,
  GestureResponderEvent
} from 'react-native';

import {Theme} from 'rns-theme/src/theme/Theme';
import {
  default as ButtonTheme,
  ButtonStyle
} from 'rns-theme/src/theme/components/Button';

export interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ButtonStyle;
  isDisabled?: boolean;
  accessibilityLabel?: string;
}

export class Button extends React.PureComponent<ButtonProps> {
  public render(): JSX.Element {
    const {accessibilityLabel, title, isDisabled, style} = this.props;

    const theme = style || ButtonTheme;

    const buttonStyle = isDisabled ? theme.buttonDisabled : theme.button;
    const textStyle = isDisabled ? theme.textDisabled : theme.text;

    const accessibilityState: AccessibilityState = {};
    if (isDisabled) {
      accessibilityState.disabled = true;
    }

    if (
      Theme.platform.isWeb || // in Web TouchableNativeFeedback is not implemented yet in react-native-web
      Theme.platform.isIos
    ) {
      return (
        <View>
          <TouchableOpacity
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            accessibilityState={accessibilityState}
            disabled={isDisabled}
            onPress={this.onButtonPressed}>
            <View style={buttonStyle}>
              <Text style={textStyle} ellipsizeMode={'clip'} numberOfLines={1}>
                {title}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View>
        <TouchableNativeFeedback
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="button"
          accessibilityState={accessibilityState}
          disabled={isDisabled}
          onPress={this.onButtonPressed}>
          <View style={buttonStyle}>
            <Text style={textStyle} ellipsizeMode={'clip'} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  protected onButtonPressed = (event: GestureResponderEvent): void => {
    this.props.onPress(event);
  };
}
