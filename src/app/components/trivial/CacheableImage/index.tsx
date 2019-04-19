import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import imageCacheHoc from "react-native-image-cache-hoc";

export interface CacheableImageProps {
  src: string;
  width: number;
  height: number;
  fileHostWhitelist?: string[];
  permanent?: boolean;
  validProtocols?: string[];
  /** Max size of file cache in bytes before pruning occurs */
  cachePruneTriggerLimit?: number;
  // TODO: add Default placeholder,
  // more https://github.com/billmalarky/react-native-image-cache-hoc/tree/20c438a62c5997e8e5bc673abeedf63f6fbb1321
}

export class CacheableImage extends Component<CacheableImageProps> {
  public static defaultProps: Partial<CacheableImageProps> = {
    validProtocols: ["http", "https"], // iOS only allows requests to https urls!!!
    cachePruneTriggerLimit: 1024 * 1024 * 20,
    permanent: false
  };

  private styles = StyleSheet.create({
    image: {
      width: this.props.width,
      height: this.props.height
    }
  });

  // more https://github.com/billmalarky/react-native-image-cache-hoc/tree/20c438a62c5997e8e5bc673abeedf63f6fbb1321
  private cacheableImage = imageCacheHoc(Image, {
    fileHostWhitelist: [...(this.props.fileHostWhitelist || []), "termokot.ru"], // TODO: move hardcode to state
    validProtocols: this.props.validProtocols,
    cachePruneTriggerLimit: this.props.cachePruneTriggerLimit
  });

  public render() {
    const { src, permanent } = this.props;

    return (
      <this.cacheableImage
        style={this.styles.image}
        source={{ uri: src }}
        permanent={permanent}
      />
    );
  }
}
