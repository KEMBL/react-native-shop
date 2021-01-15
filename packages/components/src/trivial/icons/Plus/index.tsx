import React from 'react';
import PropTypes from 'prop-types';
import * as rnSvg from 'react-native-svg';

import { BaseIcon, BaseIconProps } from '../BaseIcon';

export const PlusIcon: React.FC<BaseIconProps> = (props): JSX.Element => {
  const { Path } = rnSvg;
  const { color, height, style } = props;

  const width = props.width ?? 24;
  const viewbox = props.viewBox ?? '0 0 72 72';

  return (
    <BaseIcon color={color} width={width} height={height} style={style} viewBox={viewbox}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.3594 9.125C36.2669 9.125 37.1373 9.48552 37.779 10.1272C38.4207 10.769 38.7812 11.6393 38.7812 12.5469V31.9375H58.1719C59.0794 31.9375 59.9498 32.298 60.5915 32.9397C61.2332 33.5815 61.5938 34.4518 61.5938 35.3594C61.5938 36.2669 61.2332 37.1373 60.5915 37.779C59.9498 38.4207 59.0794 38.7812 58.1719 38.7812H38.7812V58.1719C38.7812 59.0794 38.4207 59.9498 37.779 60.5915C37.1373 61.2332 36.2669 61.5938 35.3594 61.5938C34.4518 61.5938 33.5815 61.2332 32.9397 60.5915C32.298 59.9498 31.9375 59.0794 31.9375 58.1719V38.7812H12.5469C11.6393 38.7812 10.769 38.4207 10.1272 37.779C9.48552 37.1373 9.125 36.2669 9.125 35.3594C9.125 34.4518 9.48552 33.5815 10.1272 32.9397C10.769 32.298 11.6393 31.9375 12.5469 31.9375H31.9375V12.5469C31.9375 11.6393 32.298 10.769 32.9397 10.1272C33.5815 9.48552 34.4518 9.125 35.3594 9.125V9.125Z"></Path>
    </BaseIcon>
  );
};

PlusIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.object
};
