import React, {PureComponent} from 'react';
import Svg, {Path} from 'react-native-svg';

export class LocationIcon extends PureComponent {
  public render() {
    return (
      <Svg height="24" width="24" fill="#404040">
        <Path d="M12 0C7.802 0 4 3.403 4 7.602 4 11.8 7.469 16.812 12 24c4.531-7.188 8-12.2 8-16.398C20 3.403 16.199 0 12 0zm0 11a3 3 0 110-6 3 3 0 010 6z" />
      </Svg>
    );
  }
}
