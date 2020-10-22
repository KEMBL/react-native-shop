import React from 'react';
import PropTypes from 'prop-types';
import * as rnSvg from 'react-native-svg';

import { BaseIcon, BaseIconProps } from '../../BaseIcon';

export const ArrowLeftIcon: React.FC<BaseIconProps> = (props): JSX.Element => {
  const { Path } = rnSvg;
  const { color, width, height, style } = props;
  return (
    <BaseIcon color={color} width={width} height={height} style={style}>
      <Path
        fillRule="evenodd"
        d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"></Path>
    </BaseIcon>
  );
};

ArrowLeftIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object
};
