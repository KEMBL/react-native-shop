import React from 'react';
import PropTypes from 'prop-types';
import * as rnSvg from 'react-native-svg';
import { ViewStyle } from 'react-native';

export interface BaseIconProps {
  color?: string;
  width?: number;
  height?: number;
  viewBox?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export interface BaseIconBaseProps extends BaseIconProps {
  children?: React.ReactNode;
}

export const BaseIcon: React.FC<BaseIconBaseProps> = (props): JSX.Element => {
  const { Svg } = rnSvg;
  let { color, width, height, viewBox } = props;
  const { style, children } = props;
  if (!color) {
    color = '#FFF';
  }
  if (!height) {
    height = width ?? 16;
  }
  if (!width) {
    width = 16;
  }
  if (!viewBox) {
    viewBox = '0 0 16 16';
  }
  return (
    <Svg style={style} viewBox={viewBox} width={width} height={height} fill={color}>
      {children}
    </Svg>
  );
};

BaseIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.object
};
