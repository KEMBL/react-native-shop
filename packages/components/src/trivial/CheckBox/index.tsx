import React from 'react';
import { View, ViewStyle } from 'react-native';
import PropTypes from 'prop-types';

import { Theme } from 'rns-theme/src/Theme';

import { CheckBoxDisabledIcon, CheckBoxOffIcon, CheckBoxOnIcon } from './icons';
import { Button } from '../buttons/Button';

export interface CheckBoxTintColors {
  true: string;
  false: string;
}

export interface CheckBoxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  isDisabled?: boolean;
  tintColors?: CheckBoxTintColors;
  style?: ViewStyle;
}

/**
 * UI element CheckBox
 */
export const CheckBox: React.FC<CheckBoxProps> = (props): JSX.Element => {
  const { value, style, isDisabled, onValueChange } = props;

  const tintColors = props.tintColors ?? CheckBox.defaultProps?.tintColors;

  const changeValue = (): void => {
    if (isDisabled) {
      return;
    }
    onValueChange(!value);
  };

  const icons = (
    <>
      {isDisabled && <CheckBoxDisabledIcon style={style} color={tintColors?.true} />}
      {!isDisabled && value && <CheckBoxOnIcon style={style} color={tintColors?.true} />}
      {!isDisabled && !value && <CheckBoxOffIcon style={style} color={tintColors?.false} />}
    </>
  );

  if (isDisabled) {
    return <View style={{ backgroundColor: Theme.lightGrey }}>{icons}</View>;
  }

  if (!onValueChange) {
    return icons;
  }

  return <Button onPress={changeValue}>{icons}</Button>;
};

CheckBox.defaultProps = {
  tintColors: {
    true: Theme.darkGreen,
    false: Theme.darkGreen
  }
};

CheckBox.propTypes = {
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  tintColors: PropTypes.any,
  style: PropTypes.object
};
