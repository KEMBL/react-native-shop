import 'react-native-gesture-handler';

import React from 'react';
import {Image, ImageProps} from 'react-native';

import {ImageCacherOptionsInterface} from 'rns-core/src/AppBootStrap';

/**
 * That modele is requred to substitute used in mobele app native image module with caching
 */
export class MokedImage extends React.Component<ImageProps> {
  public render() {
    return <Image {...this.props} />;
  }
}

export function mokedImage(image: Image, options: ImageCacherOptionsInterface) {
  return image;
}
