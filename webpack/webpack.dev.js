const { merge } = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common')
const path = require("path");

module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  devServer: {
    // // dev服务器的对应资源根目录
    // static: [
    //   {
    //     directory: path.join(__dirname, "../dist/"),
    //   },
    // ],
    compress: true,
    port: 9000,
  }
})

