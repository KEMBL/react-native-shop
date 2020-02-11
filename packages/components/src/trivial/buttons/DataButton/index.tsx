import React from 'react';
import {GestureResponderEvent} from 'react-native';

import {Button, ButtonProps} from '../Button';

interface MakeOnPressOptional<T> {
  onPress?: (event: GestureResponderEvent) => void;
  onClick: (data: T, event: GestureResponderEvent) => void;
  data: T;
}

// we do not want to force coders to fill in onPress (as we have onClick) so we make it optional
type DataButtonProps<T> = Modify<ButtonProps, MakeOnPressOptional<T>>;

export class DataButton<T> extends React.PureComponent<DataButtonProps<T>> {
  public render() {
    const {accessibilityLabel, title, isDisabled, style} = this.props;
    return (
      <Button
        accessibilityLabel={accessibilityLabel}
        title={title}
        isDisabled={isDisabled}
        style={style}
        onPress={this.onButtonPressed}
      />
    );
  }
  private onButtonPressed = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(event);
    }

    this.props.onClick(this.props.data, event);
  };
}