const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// ./webpack.config.js
/** @type {import('webpack').Configuration} */
const config = {
  entry: {
    index: path.join(__dirname, "../src/index.ts"),
  },
  output: {
    // 打包文件的输出目录
    path: path.join(__dirname, "../dist"),
    // 在生成文件之前清空 output 目录
    clean: true,
    // 代码打包后的文件名
    filename: "[name].bundle.js",
  },
  // 配置webpack的解析选项
  resolve: {
    // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@src": path.join(__dirname, "../src/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 打包输出HTML标题
      title: "自动生成 HTML",
      // 压缩 HTML 文件
      minify: {
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联 css
      },
      // 生成后的文件名
      filename: "index.html", 
      // 根据此模版生成 HTML 文件
      template: path.join(__dirname, "../public/index.html"), 
      // entry中的 index 入口才会被打包
      chunks: ["index"],
    }),
  ],
};

module.exports = config;
