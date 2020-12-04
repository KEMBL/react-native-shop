import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import PropTypes from 'prop-types';
import { Theme } from 'rns-theme';
import { CheckBoxOffIcon, CheckBoxOnIcon } from './icons';
import { Button } from '../buttons/Button';

export interface CheckBoxTintColors {
  true: string;
  false: string;
}

export interface CheckBoxProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  tintColors?: CheckBoxTintColors;
  style?: ViewStyle;
}

/**
 * UI element CheckBox
 */
export const CheckBox: React.FC<CheckBoxProps> = (props): JSX.Element => {
  const { value, style, onValueChange } = props;
  const [checkBoxValue, setCheckBoxValue] = useState(!!value);

  const tintColors = props.tintColors ?? CheckBox.defaultProps?.tintColors;

  const changeValue = (): void => {
    const newValue = !checkBoxValue;
    setCheckBoxValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <Button onPress={changeValue}>
      {value && <CheckBoxOnIcon style={style} color={tintColors?.true} />}
      {!value && <CheckBoxOffIcon style={style} color={tintColors?.false} />}
    </Button>
  );
};

CheckBox.defaultProps = {
  tintColors: {
    true: Theme.darkGreen,
    false: Theme.darkGreen
  }
};

CheckBox.propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
  tintColors: PropTypes.any,
  style: PropTypes.object
};
