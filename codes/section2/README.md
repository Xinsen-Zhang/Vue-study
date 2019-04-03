# 数据的绑定
* 快速体验数据的双向绑定
    * 在输入框内输入名字,下面的地方会实时响应输入的内容

<!-- TODO: 插入体验链接 -->
[代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section2/1.%20fast%20in.html)

## Vue 实例与数据绑定
### 实例与数据
* 实例化
`const app = new Vue({config})`
* `config`
    * 必不可少的是`el`
        * 可以是`HTMLElement`
        * 也可以是`CSS Selector`
        * 挂在成功之后可以通过`app.$el`来访问元素

[代码链接在这儿!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section2/1.%20fast%20in.html)

### 生命周期
* 类似于`JQuery`中的`ready`
```JavaScript
$(document).ready( function () {
    // DOM 加载完之后会执行这个地方的代码
})
```
* `Vue` 的生命周期钩子与之类似,比较常见的有:
    * `created`
        * 实例创建完成后调用,此阶段完成了数据的观测,但尚未挂在,`$el` 还不可用.
        * 需要初始化处理一些数据时比较有用
    * `mounted`
        * `el`挂载到实例上之后调用, 一般第一个业务逻辑会在这里开始
    * `beforeDestroy`
        * 实例销毁之前调用
        * 主要解绑一些使用 `addEventListen` 监听的事件等
* 这些钩子也可作为 config 的选项写入实例中, 并且钩子的`this`指向的是调用它的 `Vue` 实例
```javascript
const app = new Vue({
    el: '#app',
    data: {
        a: 2
    },
    created: function () {
        console.log(this.a); // 2
    },
    mounted: function () {
        console.log(this.$el); // <div id="app">...</div>
    }
})
```

### 插值与表达式
* 使用双大括号是最基本的插值表达式
```html
<div id="app">
    {{book}}
</div>
<script>
    const app = new Vue({
        el: '#app',
        data: {
            book: 'Vue.js 实战',
        }
    })
</script>
```
* 插值的内容也可以是实时响应的

[代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section2/2.%20real%20tile%20response.html)

* 可以使用`v-html`输出 html
* 可以使用`v-pre`跳过双大括号的编译
```html
<h1 v-pre>{{name}}</h1>
```
* 也可以是一些简单的 JS 表达式
    * 简单的运算
    * 三元运算符等

[代码链接在这儿!!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section2/3.%20express.html)

### 过滤器
* 可以在插值`{{}}`的尾部加上管道符`|`对数据进行过滤

[代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section2/4.%20filters.html)

* 过滤器还可以串联`{{message | filterA | filterB}}`
* 过滤器还可以接收参数`{{message | filterA('arg1', 'arg2')}}`
    * `arg1` 和 `arg2` 是作为第二个和第三个参数传入过滤器的
    * 第一个参数是`message`

## 指令与事件
数据驱动 DOM 是`Vue.js`的核心理念, 所以不到万不得已的时候不要主动操作 DOM.
只要维护好数据, `Vue.js` 能够帮助我们很优雅地处理 DOM 的操作

指令的一些例子
* `v-if`
<!-- TODO: 见 v-if 代码 -->
[代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section2/5.%20v-if.html)
*  `v-html`
    * 子 `HTMLElement` 的代码
* `v-pre`
    * 子节点跳过渲染和调试,保持原有样式
*  `v-bind`
    * 动态更新 HTML 节点上的属性的值
    * 简写`:`
    <!-- * TODO: `v-bind` 代码链接 -->
    [代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section2/5.v-bind.html)
* `v-on`
    * Vue 实例监听的事件行为
    * 简写 `@`
    <!-- * TODO: `v-on` 代码链接 -->
    [代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section2/6.v-on.html)
    * 也可以直接是一个内联语句
    ```html
    <button @click="show = false">点击隐藏</button>
    ```