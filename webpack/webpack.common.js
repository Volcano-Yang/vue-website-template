const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

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
      { test: /.vue$/, use: "vue-loader" },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        
        ],
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 打包输出HTML标题
      title: "打包vue",
      // 根据此模版生成 HTML 文件
      template: path.join(__dirname, "../public/index.html"),
    }),
    new VueLoaderPlugin(),
  ],
};

module.exports = config;
