import React from 'react';
import PropTypes from 'prop-types';
import * as rnSvg from 'react-native-svg';

import { BaseIcon, BaseIconProps } from '../BaseIcon';

export const AlertIcon: React.FC<BaseIconProps> = (props): JSX.Element => {
  const { Path } = rnSvg;
  const { color, height, style } = props;

  const width = props.width ?? 16;
  const viewbox = props.viewBox ?? '0 0 62 62';

  return (
    <BaseIcon color={color} width={width} height={height} style={style} viewBox={viewbox}>
      <Path d="M21.7501 61.8333C20.9323 61.8333 20.1481 61.5084 19.5698 60.9302C18.9916 60.352 18.6667 59.5677 18.6667 58.75V49.5H6.33342C4.69791 49.5 3.1294 48.8503 1.97292 47.6938C0.816448 46.5373 0.166748 44.9688 0.166748 43.3333V6.33329C0.166748 2.91079 2.94175 0.166626 6.33342 0.166626H55.6668C57.3023 0.166626 58.8708 0.816326 60.0272 1.9728C61.1837 3.12928 61.8334 4.69779 61.8334 6.33329V43.3333C61.8334 44.9688 61.1837 46.5373 60.0272 47.6938C58.8708 48.8503 57.3023 49.5 55.6668 49.5H36.8584L25.4501 60.9391C24.8334 61.525 24.0626 61.8333 23.2917 61.8333H21.7501ZM24.8334 43.3333V52.83L34.3301 43.3333H55.6668V6.33329H6.33342V43.3333H24.8334ZM34.0834 24.8333H27.9167V12.5H34.0834V24.8333ZM34.0834 37.1666H27.9167V31H34.0834V37.1666Z" />
    </BaseIcon>
  );
};

AlertIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.object
};
