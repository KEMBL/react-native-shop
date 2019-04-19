import React, { Component } from "react";
import { StyleSheet, Image as ImageRN } from "react-native";

export interface ImageProps {
  src: string;
  width: number;
  height: number;
}

export class Image extends Component<ImageProps> {
  private styles = StyleSheet.create({
    image: {
      width: this.props.width,
      height: this.props.height
    }
  });

  public render() {
    return (
      <ImageRN style={this.styles.image} source={{ uri: this.props.src }} />
    );
  }
}
