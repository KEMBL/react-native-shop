/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const monorepoProjectRoot = path.resolve(__dirname, '..', '..');

module.exports = {
  watchFolders: [monorepoProjectRoot] // requires for build of android release, does not need for dev version
};
