import React from 'react';
import PropTypes from 'prop-types';
import * as rnSvg from 'react-native-svg';

import { BaseIcon, BaseIconProps } from '../icons/BaseIcon';

const propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object
};

/**
 * Selected checkbox
 */
export const CheckBoxOnIcon: React.FC<BaseIconProps> = (props): JSX.Element => {
  const { Path } = rnSvg;
  const { color, height, style } = props;

  const width = props.width ?? 16;

  return (
    <BaseIcon color={color} width={width} height={height} style={style} viewBox="0 0 51 51">
      <Path
        d="M44.25 0.375H5.75C2.6975 0.375 0.25 2.8875 0.25 5.95833V45.0417C0.25 48.1125 2.6975 50.625 5.75 50.625H44.25C47.3025 50.625 49.75 48.1125 49.75 45.0417V5.95833C49.75 2.8875 47.3025 0.375 44.25 0.375ZM19.5 39.4583L5.75 25.5L9.6275 21.5638L19.5 31.5579L40.3725 10.3692L44.25 14.3333L19.5 39.4583Z"
        // fill="#FF0000"
      />
    </BaseIcon>
  );
};

CheckBoxOnIcon.propTypes = propTypes;

/**
 * Un-selected checkbox
 */
export const CheckBoxOffIcon: React.FC<BaseIconProps> = (props): JSX.Element => {
  const { Path } = rnSvg;
  const { color, height, style } = props;

  const width = props.width ?? 16;

  return (
    <BaseIcon color={color} width={width} height={height} style={style} viewBox="0 0 51 51">
      <Path
        d="M45.0417 5.95833V45.0417H5.95833V5.95833H45.0417ZM45.0417 0.375H5.95833C2.8875 0.375 0.375 2.8875 0.375 5.95833V45.0417C0.375 48.1125 2.8875 50.625 5.95833 50.625H45.0417C48.1125 50.625 50.625 48.1125 50.625 45.0417V5.95833C50.625 2.8875 48.1125 0.375 45.0417 0.375Z"
        // fill="#FF0000"
      />
    </BaseIcon>
  );
};

CheckBoxOffIcon.propTypes = propTypes;
