# vue-website-template

带你从0到1纯手工搭建一个vue的前端项目

# 开发依赖安装

## 初始化package.json
    npm i
## 安装ts
    npm i -D typescriptcod
## 安装vue
    npm i vue
## 安装webpack

### 安装依赖
    npm i webpack webpack-cli --save-dev

### 检查依赖
    npx webpack --version

### 创建示例文件
```
└─ 02-configuation
   ├── src
   │   ├── heading.js
   │   └── index.js
   └── index.html
```

```javascript
// ./src/heading.js

export default () => {

  const element = document.createElement('h2')

  element.textContent = 'Hello webpack'

  element.addEventListener('click', () => alert('Hello webpack'))

  return element

}
```

```javascript
// ./src/index.js

import createHeading from './heading.js'

const heading = createHeading()

document.body.append(heading)

```

```html
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <title>Webpack - 快速上手</title>

</head>

<body>

  <script type="module" src="src/index.js"></script>

</body>

</html>

```

### 尝试打包
npx webpack ./src/index.js

打包成功的话会将index.js和heading.js打包成一个js文件，你再手动引到index.html中，用vscode的Live Server插件，在浏览器预览下效果。


### 配置wepack配置文件
### 配置webpack配置文件和打包命令

```javascript
// ./webpack.config.js

/** @type {import('webpack').Configuration} */

const config = {

  entry: './src/index.js',

  output: {

    filename: 'bundle.js'

  }

}

module.exports = config

```

``` json
   "scripts": {
    "build": "webpack --config webpack.config.js --mode production"
  },

```
### 支持热更新和dev server

安装webpack-dev-server

npm i -D webpack-dev-server

创建webpack.dev.js
```javascript
const path = require("path");

// ./webpack.config.js
/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "public"),
      },
      {
        directory: path.join(__dirname, "dist"),
      },
    ],
    compress: true,
    port: 9000,
  },
};
module.exports = config;
```

将index.html从/调整到/public/，并修改引用

``` json
   "scripts": {
    "dev": "webpack-dev-server --hot --config webpack.dev.js --mode development"
  },

```

### 每次打包的时候都清楚上次的打包文件

output: {
    path: path.resolve(__dirname, 'dist/assets'),
    // 在生成文件之前清空 output 目录
    clean: true, 
    filename: "main.js",
  },
  
### 每次打包后的js文件都自动插入到html中
https://segmentfault.com/a/1190000020771762

npm i html-webpack-plugin html-loader --save-dev

解释一下html-webpack-plugin和html-loader的作用:

html-webpack-plugin插件用于根据配置自动生成html文件，并将打包后的js入口文件自动引入到生成的html中。如果有多个入口文件，它们都会被引入到html中。如果在webpack输出中含有任何的css文件（例如，用mini-css-extract-plugin提取的css），这些文件将包含在html头中的<link>标签中。
参考：https://github.com/jantimon/html-webpack-plugin

html-loader加载器用于html-webpack-plugin在根据html模板生成html时加载html模板。
参考：https://github.com/webpack-contrib/html-loader

html-webpack-plugin和html-loader之间没有任何依赖关系

html-loader的使用
```javascript
 module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    }]
  },
```

html-webpack-plugin的使用
最简单的使用
```javascript
webpack.config.js
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
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
```

高级使用
先创建一个html模板文件
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>

```

```javascript
webpack.config.js
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
  plugins: [
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: '自动生成 HTML',
      // 压缩 HTML 文件
      minify: {
        removeComments: false, // 移除 HTML 中的注释
        collapseWhitespace: false, // 删除空白符与换行符
        minifyCSS: false // 压缩内联 css
      },
      filename: 'index.html', // 生成后的文件名
      template: path.resolve(__dirname, 'index.html'), // 根据此模版生成 HTML 文件
      chunks: ['main'] // entry中的 main 入口才会被打包
    })
  ]
};
```

### 支持ts并打包

1. 安装ts和ts-loader

npm i -D typescript

npm i -D ts-loader

2. 设置ts-loader

```
 // 配置webpack的解析选项
  resolve: {
    // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@packages": path.resolve(__dirname, "../"),
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
```

3. 设置tsconfig.json
```
{
    "compilerOptions": {
        "target": "es5",
        "sourceMap": true,
        "paths": {
            "@src/*": ["./src/*"],
        },
    }
    
}

```

### webpack配置抽离和复用

https://blog.csdn.net/hope_It/article/details/103266318

### 配置打包进度条

```
"scripts": {
    "build": "webpack --config webpack.config.js --mode production --progress",
    "dev": "webpack-dev-server --hot --config webpack.dev.js --mode development --progress"
  },
```
后面加 --progress


### 支持vue并打包

## 安装tsw
 
