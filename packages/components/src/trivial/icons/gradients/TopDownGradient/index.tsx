import React, {PureComponent} from 'react';
import * as rnSvg from 'react-native-svg';

interface TopDownGradientProps {
  topColor: string;
  bottomColor: string;
  width: number;
  height: number;
}

export class TopDownGradient extends PureComponent<TopDownGradientProps> {
  public render(): JSX.Element {
    const {topColor, bottomColor, width, height} = this.props;
    const {Svg, Defs, LinearGradient, Stop, Rect} = rnSvg;
    
    return (
      <Svg height={height} width={width}>
        <Defs>
          <LinearGradient id="prefix__a" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={topColor} />
            <Stop offset="100%" stopColor={bottomColor} />
          </LinearGradient>
        </Defs>
        <Rect height={height} width={width} fill="url(#prefix__a)" />
      </Svg>
    );
  }
}
