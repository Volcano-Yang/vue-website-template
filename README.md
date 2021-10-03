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
### dev server

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

注意：
1. webpack-dev-server里 Watch 模式默认开启。文件修改回自动重新打包

2. webpack-dev-server为了提高预览速度，构建的产物是保存在内容里的。默认资源目录为打包的产物文件夹，所以static: [
      {
        directory: path.join(__dirname, "public"),
      },
      {
        directory: path.join(__dirname, "dist"),
      },
    ],可以不加。


### 配置热更新

HMR 已经集成在了 webpack 模块中了，所以不需要再单独安装什么模块。

使用这个特性最简单的方式就是，在运行 webpack-dev-server 命令时，通过 --hot 参数去开启这个特性。

或者也可以在配置文件中通过添加对应的配置来开启这个功能。那我们这里打开配置文件，这里需要配置两个地方：

首先需要将 devServer 对象中的 hot 属性设置为 true；
然后需要载入一个插件，这个插件是 webpack 内置的一个插件，所以我们先导入 webpack 模块，有了这个模块过后，这里使用的是一个叫作 HotModuleReplacementPlugin 的插件。
具体配置代码如下：

```javascript
// ./webpack.config.js
const webpack = require('webpack')

module.exports = {
  // ...
  devServer: {
    // 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    hot: true
    // 只使用 HMR，不会 fallback 到 live reloading
    // hotOnly: true
  },
  plugins: [
    // ...
    // HMR 特性所需要的插件
    new webpack.HotModuleReplacementPlugin()
  ]
}
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

可以参考https://blog.csdn.net/hope_It/article/details/103266318，但是要注意文件路径的差别。

### 配置打包进度条

```
"scripts": {
    "build": "webpack --config webpack.config.js --mode production --progress",
    "dev": "webpack-dev-server --hot --config webpack.dev.js --mode development --progress"
  },
```
后面加 --progress

### 配置source-map

```
在webpack.dev.js中添加

devtool: 'source-map' // source map 设置

```

### 支持vue并打包

可以参考vue-loader的教程，https://vue-loader.vuejs.org/zh/guide/#vue-cli。

1. 安装相应loader
   npm install -D vue-loader vue-template-compiler

2. 修改webpack配置

```
// webpack.config.js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```
3. 修改index.html文件，添加id=app
``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app">
    </div>
  </body>
</html>
```

4. 编写一个vue文件
```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!!!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>
```
5. 在index.ts文件中引入vue和app.vue并渲染
```
import Vue from "vue"
import app from "./app.vue"

let vm=new Vue({
    el:'#app',
    render:c=>c(app)
})
```
6. 解决ts文件中引入vue文件时的“找不到模块“./app.vue”或其相应的类型声明。”报错。

```typescript
// /types/global.ts

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
```
## 安装tsw
 
