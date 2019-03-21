# webpack4 + vue 构建简单的开发环境
## 初始化
`npm init -y`
## 安装必要的资源
`npm install --save-dev webpack webpack-dev-server webpack-cli vue vue-loader vue-template-compiler css-loader mini-css-extract-plugin`
* 快速使用 webpack 开发模式
  * 安装 `webpack-dev-server`
* webpack4 的依赖
  * 安装 `webpack-cli`
* 因为需要编译`.vue`单文件中的模板
  * 安装`vue-template-compiler`
* 因为需要编写样式
  * `webpack`说到底只是 js, 不能直接识别 CSS 选择器
  * css-loader
* css 提取并且形成一个单文件
  * 不提取的话会使最终打包好的`js`文件臃肿
  * 在 `webpack4` 下提取 css 至单文件可以利用`mini-css-extract-plugin`
## 新建 src, 编写代码
* `mkdir src`
* `touch App.vue`
* 代码编写

```javascript
<template>
    <div id="test">
        Hello {{message}}
    </div>
</template>

<script>
export default {
    data () {
        return {
            message: 'devoloper'
        }
    }
}
</script>

<style scoped>
    #test {
        color: #f50;
    }
</style>

```

## webpack 配置
* `touch webpack.config.js`

```javascript
// 加载必要的资源
var path = require('path');
// 暴露接口
module.exports = {
    // 入口的配置
    entry: path.join(__dirname, './src/index.js'),
    // 出口的配置
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    }
}
```

## 编写 index.js
`touch src/index.js`
```javascript
// 导入必要的资源
import Vue from 'vue'
import App from './App.vue' //相对路径

new Vue({
    // 挂载
    el: '#app',
    // 渲染
    render: h => h(App)
})
```

## 添加 dev 指令
* 在`package.json`文件中添加指令 dev(对应到 `script` 的 value 中)
```javascript
{
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "webpack-dev-server --open --config webpack.config.js"
}
```
> `--open`: 自动打开默认浏览器  
> `--host`: 可通过此参数配置地址  
> `--prop`: 可通过此参数配置端口
## 配置加载 vue 单文件组件
* 修改`webpack.conf.js`
最终修改如下
```javascript
// 导入必要的资源
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

// vueLoaderPlugin 的导入
var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 入口的配置
    entry: path.join(__dirname, './src/index.js'),
    // 出口的配置
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    // module的 rules 配置(文件加载的设置)
    module: {
        rules: [
            // 使用对象的形式对不同类型的文件的加载方式进行配置
            // .vue 文件的配置
            {
                // 正则表达式来检验文件是否使用此类配置
                test: /\.vue$/,
                // loader的配置
                loader: 'vue-loader'
            },
            // .css 文件的配置
            {
                test: /\.css$/,
                // 使用 use
                // 先进行 css 的加载(识别 css 选择器)
                // 然后提取至单文件
                use: [MiniCssExtractPlugin.loader,
                    'css-loader']
            }
        ]
    },
    // plugins 的配置
    plugins: [
        // 将 css 文件提取至/dist/style.css 下
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new VueLoaderPlugin()
    ]
}
```
## index.html的编写
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>webpack4 + vue 快速手工搭建</title>
    <!--导入提取后的样式文件-->
    <link rel="stylesheet" href="/dist/style.css">
</head>
<body>
    <div id="app"></div>
    <!-- 加载打包后的 js 文件 -->
    <script src="/dist/bundle.js"></script>
</body>
</html>
```
## 再进一步
现在可以进行业务的拓展了.
比如多写几个组件
在`/src/components`写组件
* `mkdir /src/components`
* 具体可见[笔者的 github](https://github.com/Xinsen-Zhang/Vue-study/tree/master/codes/section10/3_vue_webpack_dev)