const path = require("path");

// ./webpack.config.js
/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    // 在生成文件之前清空 output 目录
    clean: true, 
    filename: "main.js",
  },
};
module.exports = config;
