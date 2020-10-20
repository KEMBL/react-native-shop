import 'react-native-gesture-handler';

import React from 'react';
import { Image, ImageProps } from 'react-native';

import { ImageCacherOptionsInterface } from 'components/src/trivial/CacheableImage/ImageCacherOptionsInterface';

/**
 * That modele is requred to substitute used in mobele app native image module with caching
 */
export class MokedImage extends React.Component<ImageProps> {
  public render = (): JSX.Element => <Image {...this.props} />;
}

/**
 * Mocks react-native-image-cache-hoc with Image module from react-native-web
 * It requires because we cannot use Java dependent
 *
 * @param {Image} image component which will be bypassed to Core code for use to show images
 * @param {any} options it is not used
 * @returns {Image} react-native Image component
 */
export const mokedImage = (
  image: Image,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  options: ImageCacherOptionsInterface
): Image => {
  return image;
};
