import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import PropTypes from 'prop-types';

import { Theme } from 'rns-theme';
export interface HrProps {
  style?: ViewStyle;
}

/**
 * Draw a horisonatal line
 */
export const Hr: React.FC<HrProps> = (props): JSX.Element => {
  let combinedStyle: StyleProp<ViewStyle> = Hr.defaultProps?.style;
  if (props.style) {
    combinedStyle = StyleSheet.compose(Hr.defaultProps?.style, props.style);
  }

  return <View style={combinedStyle} />;
};

Hr.propTypes = {
  style: PropTypes.object
};

Hr.defaultProps = {
  style: {
    height: 3, // less amount caused it to cut off simetimes
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Theme.middleGrey
  }
};
