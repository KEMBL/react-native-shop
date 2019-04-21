import React, { PureComponent } from "react";
import { Text, TextStyle } from "react-native";

type EllipsizeMode = "head" | "middle" | "tail" | "clip";

export interface PlainTextProps {
  style?: TextStyle;
  wrapLines?: number;
}

export class PlainText extends PureComponent<PlainTextProps> {
  public render() {
    const { style, wrapLines, children } = this.props;

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
