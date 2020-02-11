import React from 'react';
import {AppRegistry} from 'react-native';
import imageCacheHoc from 'react-native-image-cache-hoc';

import {AppBootStrap} from 'rns-core/src/AppBootStrap';
import {name as appName} from 'rns-core/src/app.json';

/**
 * React native App initialisation
 * Metro bundler will search for this file, do not move it anywhere
 */

const AddedContext: React.FC = _ => {
  return <AppBootStrap imageCacherInterface={imageCacheHoc} />;
};

// imageCacherInterface={imageCacheHoc}

AppRegistry.registerComponent(appName, () => AddedContext);

//  (
//  <AppBootStrap imageCacherInterface={imageCacheHoc} />
//  )
