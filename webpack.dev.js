const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// ./webpack.config.js
/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.js",
  output: {
    // 在生成文件之前清空 output 目录
    clean: true, 
    filename: "main.js",
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "dist"),
      },
    ],
    compress: true,
    port: 9000,
  },
  plugins:[
		new CleanWebpackPlugin(),
	],
};
module.exports = config;
