const webpack = require('webpack');
const path = require('path');
const join = path.join;

const aliasPathJoin = moduleFolders =>
  join(process.cwd(), '..', '..', 'node_modules', join(...moduleFolders));

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js'
  },
  watch: !isProduction,
  watchOptions: {
    aggregateTimeout: 600   
  },
  optimization: {
    minimize: isProduction
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.web.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
      './RNGestureHandlerModule': aliasPathJoin([
        'react-native-gesture-handler',
        'RNGestureHandlerModule.web.js'
      ]),
      './GestureHandlerButton': aliasPathJoin([
        'react-native-gesture-handler',
        'GestureHandlerButton.web.js'
      ]),
      './GestureComponents': aliasPathJoin([
        'react-native-gesture-handler',
        'GestureComponents.web.js'
      ]),
      './PlatformConstants': aliasPathJoin([
        'react-native-gesture-handler',
        'PlatformConstants.web.js'
      ]),
      './InitialWindowSafeAreaInsets': aliasPathJoin([
        'react-native-safe-area-context',
        'lib',
        'module',
        'InitialWindowSafeAreaInsets.web.js'
      ]),
      './NativeSafeAreaView': aliasPathJoin([
        'react-native-safe-area-context',
        'lib',
        'module',
        'NativeSafeAreaView.web.js'
      ])
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules[/\\](?!react-native|react-native-paper|react-native-vector-icons|react-native-safe-area-view|react-native-gesture-handler|react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation\/.*)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {debug: !isProduction}],
              '@babel/preset-react',
              '@babel/preset-flow'
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          logInfoToStdOut: true,
          projectReferences: true
        }
      }
    ]
  },
  plugins: [
    // __DEV__ flag is required by browser plugins
    new webpack.DefinePlugin({
      __DEV__: process.env
    })
  ]
};
