import React from 'react';
import {AppRegistry} from 'react-native';
import ReactDOM from 'react-dom';

import {AppBootStrap} from 'rns-core/src/AppBootStrap';
import {name as appName} from './app.json';
import {mokedImage} from './components/MockedImage';

const AddedContext: React.FC = _ => {
  // Problem: Core package should not wotk with platform dependent modules but in Mobile env
  // we have java dependent library.
  // Solution: Send Java dependent library to Core package as a dependency injection
  return <AppBootStrap imageCacherInterface={mokedImage} />;
};

/**
 * React native mobile application entry point
 */
AppRegistry.registerComponent(appName, () => AddedContext);
ReactDOM.render(<AddedContext />, document.querySelector('.root'));
