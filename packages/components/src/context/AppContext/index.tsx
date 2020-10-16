import React from 'react';
import { Image } from 'react-native';

import { ImageCacherOptionsInterface } from '../../trivial/CacheableImage/ImageCacherOptionsInterface';
import { StylableText } from '../../trivial/text/StylableText';

export interface AppContextProps {
  imageCacherInterface: (image: Image, options: ImageCacherOptionsInterface) => React.Component;
}

/**
 * Context helps to bypass platform dependent Image component from top main platform to beneath packages
 */
export const AppContext = React.createContext<AppContextProps>({
  imageCacherInterface: (_: Image, __: ImageCacherOptionsInterface) =>
    new React.Component(() => {
      return (
        <StylableText>
          No Image viewer assigned: {!!_} {!!__}
        </StylableText>
      );
    })
});
