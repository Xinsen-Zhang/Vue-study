# vue-router 入门记录

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

## 跳转

在使用 `vue-router` 的时候, 有两种可以跳转的方式. 一种是使用内置的`<router-link>` 组件, 另一种是使用 JS 进行跳转

### `<router-link>` 组件实现跳转

`<router-link>` 是一个内置的组件, 会被渲染成一个`<a>`标签.这个功能我在`/src/components/index.vue` 中实现了
<!-- TODO: 插入 index.vue 的代码链接 -->

```html
<router-link to="/about">跳转到 about</router-link>
```

> to 是一个 `prop`, 能够用`v-bind` 进行绑定

在 HTML5 的 History 模式下, 会拦截点击.`<router-link>` 中还有其他的一些重要的 prop

* tag
  * tag 可以指定渲染的是一个什么样的标签. e.g. `<router to="index" tag="li">` 渲染出来的就是一个`<li>`标签, 而不是`<a>` 标签
* replace
  * 使用`replace` 不会留在`History`记录, 所以跳转后不能使用后退键返回上一个页面
* active-class
  * 当`router-link`对应的路由成功匹配的时候, 会自动给当前匹配的元素设置一个`router-link-active` 的 class, 设置 `prop:active-class`可以修改默认的名称.

上述三个 prop, 我在`/src/components/user.vue` 中实现了两个功能.
<!-- TODO: 插入 user.vue 的代码链接 -->

### JS 实现跳转
通过`router`实例的方法, 来达到类似以改变 `window.location.href` 实现跳转的方法

```js
    this.$router.push('/user/123456');
```
上述功能我在`/src/components/about.vue` 中实现了
<!-- TODO : 插入 about.vue 的代码链接-->

还有一些其他的方法.

* replace
  * `this.$router.replace('index')`
  * 类似呀`router-link` 的 replace prop
* go
  * `this.$router.go(n)`
  * 页面跳转, n 可正可负, 必须是一个整数
  * 类似以 `window.history.go()`

## 高级用法

通过钩子函数, 进行一些业务的实现.
常用的钩子函数, `beforeEach` 和 `afterEach`, 它们会在路由即将改变前和即将改变后触发.  
比如可以实现以下业务

### 网页标题的修改

首先给每个 路由映射添加标题数据.e.g.
```js
{
  path: '/index',
  name: 'index',
  meta: {
    title: '首页'
  },
  // component: index
  component: (resolve) => require(['@/components/index'], resolve)
}
```

然后利用钩子函数`beforeEach` 进行网页标题的修改.

```js
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
```

导航钩子有三个参数
* to
  * 即将要进入的目标的路有对象
* from
  * 即将要离开的导航页的路有对象
* next
  * 调用该方法, 可以进入下一个钩子

### 跳转页面的时候, 页面跳转到顶部

```js
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})
```

### 登录的验证

```js
router.beforeEach((to, from, next) => {
  if (window.localStorage.getItem('token')) {
    next()
  }
  else {
    next('/login')
  }
})
```

> next()的参数为`false`的时候可以取消导航, 并且设置页面进行跳转

上述除了登录之外的业务, 我都在`/src/router/index.js` 中进行了实现.
<!-- TODO: 插入代码router/index.js 的链接 -->