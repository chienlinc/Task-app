const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    static: './dist',
    port: 8088,
    open: true,
    hot: true,
  },
});
