import React, { PureComponent } from "react";
import { Text, TextStyle } from "react-native";
import { Theme } from "../../../../theme/Theme";

type EllipsizeMode = "head" | "middle" | "tail" | "clip";

export interface StylableTextProps {
  style?: TextStyle;
  wrapLines?: number;
}

export class StylableText extends PureComponent<StylableTextProps> {
    public static defaultProps: Partial<StylableTextProps> = {
        style: {
          fontFamily: Theme.fontFamily,
          color: Theme.textColor
        }
      };

  public render() {
    let { style, wrapLines, children } = this.props;

    let numberOfLines: number = 0;
    let ellipsizeMode: EllipsizeMode = "clip";
    if (wrapLines) {
      ellipsizeMode = "tail";
      numberOfLines = wrapLines;
    }

    return (
      <Text
        style={style}
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines || undefined}
      >
        {children}
      </Text>
    );
  }
}
