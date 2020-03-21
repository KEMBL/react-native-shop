module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js'
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-image-cache-hoc': 'react-native-image-cache-hoc-mock',
      'react-native-svg': 'react-native-svg-web'
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          logInfoToStdOut: true,
          projectReferences: true
        }
      }
    ]
  }
};
