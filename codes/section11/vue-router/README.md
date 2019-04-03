# vue-router

> 这是一个利用 vue-cli 搭建的简单的项目, 项目建立的主要目的是为了记录一些 Vue-router 的学习过程

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

## 准备工作

在`/src/components` 中新建两个组件, `index.vue` 和 `about.vue`
<!-- TODO: 插入 index.vue 和 about.vue 的代码链接 -->

在`/src/App.vue` 中将图片内容注释掉
<!-- TODO: 插入 App.vue 的代码链接 -->

## vue-router 的基本用法

### 加载

首先需要在`/src/router/index.js` 中引入并且通过`Vue.use()` 加载插件

> vue-cli 已经自动帮我们搭建好了

### 配置

然后在`src/router/index.js` 中利用数组的形式, 创建路由匹配列表

```js
export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: (resolve) => require(['@/components/index'], resolve)
    },
    {
      path: '/about',
      name: 'about',
      component: (resolve) => require(['@/components/about'], resolve)
    }
  ]
})
```

> 在上面的写法当中, webpack 会将组件打包成 js 文件, 同时, 使用 resolve 的方式可以实现懒加载(需要的时候才进行加载)
> 一次性加载可以写成`component: require('@/components/index')` ,或者先引入组件,然后`component: index`

可以在数组中设置重定向

```js
{
    path: '*',
    name: 'redirect',
    redirect: '/index'
}
```

需要添加`mode`配置. `mode: 'history'`

> 由于 vue-cli 搭建的项目当中, webpack-dev-server 的`history-fallback-api`配置项已经自动开启, 不需要进行配置. 不然的话需要在配置文件中打开, 或者在`npm run dev`的命令中, 加上`--history-api-fallback` 的设置

### 挂载

在`/src/App.vue`中, `<router-view>` 标签来挂载所有的标签组件

### 带参数的路由及参数的访问
在很多时候, 路由当中会存在动态的参数, 比如`/user/9527`, 其中, `19527` 对应了 user 的 id, 那么在路由当中应该携带参数, 同时在组件当中应该能够访问这个参数

#### 带参数的路由配置

可以在路径中通过`:paramName`的形式配置

```js
{
    path: '/user/:id',
    name: 'user',
    component: resolve => require(['@/components/user'], resolve)
}
```
> 此时如果访问`localhost:8080/user`, 不带有 id 的话, 仍然会重定向到`/index` 页面当中

#### 路由中参数的访问

在组件中, 可以通过`this.$route.params.id` 来访问参数.

```js
export default {
  computed: {
    userId () {
      return this.$route.params.id
    }
  }
}
```
<!--  TODO: user.vue 组件的代码链接的插入 -->
