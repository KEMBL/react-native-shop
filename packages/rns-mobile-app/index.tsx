import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React from 'react';
import {AppRegistry} from 'react-native';
import imageCacheHoc from 'react-native-image-cache-hoc';

import {AppBootStrap} from 'rns-core/src/AppBootStrap';
import {name as appName} from './app.json';

const AddedContext: React.FC = () => {
  // Problem: Core package should not wotk with platform dependent modules but in Mobile env
  // we have java dependent library.
  // Solution: Send Java dependent library to Core package as a dependency injection
  return <AppBootStrap imageCacherInterface={imageCacheHoc} />;
};

/**
 * React native mobile application entry point
 */
AppRegistry.registerComponent(appName, () => AddedContext);
