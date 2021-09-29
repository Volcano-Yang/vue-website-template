const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// ./webpack.config.js
/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.js",
  output: {
    // 打包文件的输出目录
    path: path.resolve(__dirname, 'dist'),
    // 在生成文件之前清空 output 目录
    clean: true, 
    // 代码打包后的文件名
    filename: '[name].bundle.js', 
    // 引用的路径或者 CDN 地址
    publicPath: __dirname + '/dist/', 
    // 代码拆分后的文件名
    chunkFilename: '[name].js' 
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: '自动生成 HTML',
      // 压缩 HTML 文件
      minify: {
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联 css
      },
      filename: 'index.html', // 生成后的文件名
      template: path.resolve(__dirname, 'index.html'), // 根据此模版生成 HTML 文件
      chunks: ['main'] // entry中的 main 入口才会被打包
    })
  ]
};

module.exports = config;
