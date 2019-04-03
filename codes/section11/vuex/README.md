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

在`/src/store/index.js` 中引入`vuex` 并且加载插件, 进行简单的配置.

```js
import Vue from 'vue'
import Vuex from 'vuex'

// load the plugin
Vue.use(Vuex)

var store = new Vuex.Store({
})

export default store
```

在`/src/App.vue` 中将图片内容注释掉
<!-- TODO: 插入 App.vue 的代码链接 -->

在`/src/main.js` 中引入`/src/store/index.js` 并且注册到视图模型中
<!-- TODO: 插入 main.js 的代码链接 -->

## 基本用法

store 包含了应用的数据(状态)和操作过程. Vuex 中的数据也是响应式的, 只要 store 中的数据发生改变, 视图也就会立即发生改变.  
数据保存在 state 字段内. 比如现在打算实现一个简单的计数器的业务  
state 字段的内容.
```js
var state = {
  count: 0
}
```

同时, 新建一个 `index.vue` 的组件(`/src/component/index.vue`), 使用`store`实例读取 Vuex 管理的状态.

<!-- TODO: 插入 index.vue 的代码链接 -->

此时, 在组件内, 来自 store 的数据并不能直接手动改变, 改变 store 中的数据的唯一途径就是显式地提交 mutations.  
mutations 也是 store 中的一个字段, 用来直接修改 state 中的数据, 需要接受一个参数 state.

```js
var mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
}
```

mutations 还能接收第二个参数, 可以是数字, 字符串和对象类型.

```js
var mutations = {
  increment (state, n = 1) {
    state.count += n
  },
  decrement (state, n = 1) {
    state.count -= n
  }
}
// 当一个参数不够时, 可以传入对象, 无限扩展
```

提交 mutations 的另一种方法是传入含有`type`字段的对象

在 `src/store/index.js`中修改 mutations 字段

```js
decrement (state, params) {
    state.count -= params.num
  }
```

在 `src/component/index.vue` 中修改提交 mutations 的方法

```js
handleReduce () {
    // this.$store.commit('decrement', this.randomNum)
    this.$store.commit({
    type: 'decrement',
    n: this.randomNum
    })
    this.changeNum()
}
```

> 在 mutations 中尽量不要异步操作数据, 因为在组件 commit 之后, 数据不能立即发生改变, 而且不知道什么时候才会发生改变.

## 高级用法
`Vuex` 主要有以下三种高级用法, `getters`, `actions`, `modules`
