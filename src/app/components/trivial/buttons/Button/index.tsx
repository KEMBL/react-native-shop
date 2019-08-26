import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  AccessibilityState,
  Text,
  View,
  GestureResponderEvent
} from "react-native";

import { Theme } from "../../../../theme/Theme";
import {
  default as ButtonTheme,
  ButtonStyle
} from "./../../../../theme/components/Button";

export interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ButtonStyle;
  isDisabled?: boolean;
  accessibilityLabel?: string;
}

export class Button extends React.PureComponent<ButtonProps> {
  public render() {
    const { accessibilityLabel, title, isDisabled, style } = this.props;

    const theme = style || ButtonTheme;

    const buttonStyle = isDisabled ? theme.buttonDisabled : theme.button;
    const textStyle = isDisabled ? theme.textDisabled : theme.text;

    const accessibilityStates: AccessibilityState[] = [];
    if (isDisabled) {
      accessibilityStates.push("disabled");
    }

    if (Theme.platform.isIos) {
      return (
        <View>
          <TouchableOpacity
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            accessibilityStates={accessibilityStates}
            disabled={isDisabled}
            onPress={this.onButtonPressed}
          >
            <View style={buttonStyle}>
              <Text style={textStyle} ellipsizeMode={"clip"} numberOfLines={1}>
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
          accessibilityStates={accessibilityStates}
          disabled={isDisabled}
          onPress={this.onButtonPressed}
        >
          <View style={buttonStyle}>
            <Text style={textStyle} ellipsizeMode={"clip"} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  protected onButtonPressed = (event: GestureResponderEvent) => {
    this.props.onPress(event);
  };
}
