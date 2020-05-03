import React, { PureComponent } from "react";
import { TextStyle } from "react-native";

import { StylableText } from "../StylableText";

export interface Header3TextProps {
  style?: TextStyle;
}

export class Header3Text extends PureComponent<Header3TextProps> {
  public static defaultProps: Partial<Header3TextProps> = {
    style: { fontSize: 14 }
  };

  public render(): JSX.Element {
    const { style, children } = this.props;
    return (
      <StylableText style={style} wrapLines={1}>
        {children}
      </StylableText>
    );
  }
}
