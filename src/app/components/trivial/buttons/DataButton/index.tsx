import React from "react";
import { GestureResponderEvent } from "react-native";

import { ButtonProps } from "../Button";

interface MakeOnPressOptional<T> {
  // isDisabled?: boolean;
  // accessibilityLabel?: string;
  onPress?: (event: GestureResponderEvent) => void;
  onClick: (data: T, event: GestureResponderEvent) => void;
  data: T;
}

// we do not want to force coders to fill in onPress (as we have onClick) so we make it optional
type DataButtonProps<T> = Modify<ButtonProps, MakeOnPressOptional<T>>;

export class DataButton<T> extends React.PureComponent<DataButtonProps<T>> {
  protected onButtonPressed(event: GestureResponderEvent) {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
    if (this.props.onClick) {
      this.props.onClick(this.props.data, event);
    }
  }
}
