import React, {PureComponent} from 'react';
import {Image, ImageResizeMode, ImageStyle} from 'react-native';

export interface CacheableImageProps {
  style: ImageStyle;
  src: string;
  width: number;
  height: number;
  fileHostWhitelist?: string[];
  permanent?: boolean;
  validProtocols?: string[];
  /** Max size of file cache in bytes before pruning occurs */
  cachePruneTriggerLimit?: number;
  resizeMode: ImageResizeMode;
  // tslint:disable-next-line:no-any
  imageCacheHoc: any;
}

export class CacheableImage extends PureComponent<CacheableImageProps> {
  public static defaultProps: Partial<CacheableImageProps> = {
    validProtocols: ['http', 'https'], // iOS only allows requests to https urls!!!
    cachePruneTriggerLimit: 1024 * 1024 * 20,
    permanent: false,
    resizeMode: 'contain'
  };

  private cacheableImage = this.props.imageCacheHoc(Image, {
    fileHostWhitelist: [...(this.props.fileHostWhitelist || []), 'termokot.ru'], // TODO: move hardcode to state
    validProtocols: this.props.validProtocols,
    cachePruneTriggerLimit: this.props.cachePruneTriggerLimit
  });

  public render() {
    const {src, style, permanent, resizeMode} = this.props;

    return (
      <this.cacheableImage
        style={style}
        source={{uri: src}}
        permanent={permanent}
        resizeMode={resizeMode}
      />
    );
  }
}
