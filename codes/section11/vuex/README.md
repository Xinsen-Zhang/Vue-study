# vuex 从0到1

> 利用 vue-cli 快速搭建一个项目, 记录了 vuex 的 一些操作

## 项目初始化

```bash
vue init webpack router-router
# 使用 webpack 作为打包工具
# 需要安装 vue-router
# 暂时不需要单元测试等工具
# 使用 npm 进行依赖的管理
# 可是选择不安装依赖, 然后手动使用 cnpm 进行依赖安装
```

## 一些配置的修改

修改 `/config/index.js`中的配置项, 使得在 `npm run dev` 的时候自动打开浏览器.

```diff
-   autoOpenBrowser: false,
+   autoOpenBrowser: true
```

## 编译过程

``` bash
# install dependencies
cnpm install

# serve with hot reload at localhost:8080
npm run dev
```

## 背景介绍

对于非父子组件之间的通信, 最容易想到的是 Bus(中央事件总线)的方法, 用来触发和接收时间, 从而达到通信的目的. 而`Vuex`作为一个 Vue 的插件, 它的设计也是为了解决这个问题.  
一个组件可以分为数据(model)和视图(view), 数据更新时, 视图也会自动更新. 在视图中可以绑定一些时间, 它们触发 methods 里的一些方法, 从而可以改变数据, 更新视图. 这是一个组件的基本运行模式.  
而 Vuex 的出现, 能够非常优雅和高效的进行状态管理.

## 准备工作

安装 vuex

```bash
cnpm i -D vuex
```