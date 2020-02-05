/**
 * @format
 */
import {AppRegistry} from 'react-native';

import {AppBootStrap} from './build/AppBootStrap';
import {name as appName} from './build/app.json';

/**
 * React native App initialisation
 * Metro bundler will search for this file, do not move it anywhere
 */
AppRegistry.registerComponent(appName, () => AppBootStrap);
