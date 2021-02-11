import React from 'react';
import PropTypes from 'prop-types';
import * as rnSvg from 'react-native-svg';

import { BaseIcon, BaseIconProps } from '../../BaseIcon';

export const ChevronRightIcon: React.FC<BaseIconProps> = (props): JSX.Element => {
  const { Path } = rnSvg;
  const { color, height, style } = props;

  const width = props.width ?? 16;

  return (
    <BaseIcon color={color} width={width} height={height} style={style}>
      <Path
        fillRule="evenodd"
        d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></Path>
    </BaseIcon>
  );
};

ChevronRightIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object
};
