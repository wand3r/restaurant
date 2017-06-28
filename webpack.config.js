const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, 'src')
const buildPath = path.join(__dirname, 'build')

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    path.join(srcPath, 'index.jsx'),
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['react-hot-loader/webpack', 'babel'], include: [srcPath]},
      {test: /\.png$/, loaders: ['file-loader'], include: srcPath},
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.SourceMapDevToolPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      inject: true,
    }),
  ],
  devServer: {
    inline: true,
    hot: true,
    port: 3333,
  },
}
