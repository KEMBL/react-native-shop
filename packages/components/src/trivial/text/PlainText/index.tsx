import React, { PureComponent } from "react";
import { TextStyle } from "react-native";

import { StylableText } from "../StylableText";

export interface PlainTextProps {
  style?: TextStyle;
  wrapLines?: number;
}

export class PlainText extends PureComponent<PlainTextProps> {
  public static defaultProps: Partial<PlainTextProps> = {
    style: { fontSize: 11 }
  };

  public render() {
    let { style, wrapLines, children } = this.props;

    return (
      <StylableText style={style} wrapLines={wrapLines}>
        {children}
      </StylableText>
    );
  }
}
