/**
 * Metro configuration for React Native
 *
 * @format
 */
const fs = require('fs');
const path = require('path');

const config = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
    path.resolve(__dirname, '..')
  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    blacklistRE: /(.*\\components\\node_modules\\.*|.*\\rns-theme\\node_modules\\.*|.*\\rns-core\\node_modules\\.*)$/,
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          // 1. from self modules
          let componentPath = path.join(__dirname, `node_modules/${name}`);
          if (fs.existsSync(componentPath)) {
            return componentPath;
          }

          // 2. from root modules
          componentPath = path.join(__dirname, `../../node_modules/${name}`);
          if (fs.existsSync(componentPath)) {
            return componentPath;
          }

          console.warn(
            `component ${name} is not found at path ${componentPath}`
          );

          return componentPath;
        }
      }
    ),
    sourceExts: ['ts', 'tsx', 'js', 'jsx']
  }
};

module.exports = config;
