const { merge } = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const path = require("path");

module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "../dist/"),
      },
    ],
    compress: true,
    port: 9000,
  }
})

