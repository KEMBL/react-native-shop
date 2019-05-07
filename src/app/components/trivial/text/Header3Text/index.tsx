import React, { PureComponent } from "react";
import { TextStyle } from "react-native";

import { PlainText } from "../PlainText";

export interface Header3TextProps {
  style?: TextStyle;
}

export class Header3Text extends PureComponent<Header3TextProps> {
  public static defaultProps: Partial<Header3TextProps> = {
    style: { fontSize: 14 }
  };

  public render() {
    const { style, children } = this.props;
    return (
      <PlainText style={style} wrapLines={1}>
        {children}
      </PlainText>
    );
  }
}
