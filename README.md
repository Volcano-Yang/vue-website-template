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

### 支持打包ts和vue

### 支持dev

## 安装tsw
 
