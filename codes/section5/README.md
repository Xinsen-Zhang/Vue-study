# 内置指令
## 基本指令
### v-cloak
* 它会在 Vue 实例结束编译时从绑定的`HTML`元素上移除,经常和`display: none`配合使用

<!-- TODO : 插入代码 1. v-cloak.html -->
[代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section5/1.%20v-cloak.html)
### v-once
* 定义它的元素或者组件只渲染一次,包括元素或组件的所有子节点
* 首次渲染之后不在岁数据的变化重新渲染
    * 视作静态内容
<!-- TODO: 插入代码 2.v-once.html -->
[代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section5/2.v-once.html)

## 条件渲染指令
### v-if,v-elseif, v-else
* 根据表达式的值在 DOM 中销毁或渲染元素/组件
* 如果一次判断的是多个元素.则可以在`<template>`是判断, `<tempalte></template>`不会被渲染
```html
<div id="app">
    <template v-if="status === 1">
        <p>这是一段文字</p>
        <p>这是一另段文字</p>
        <p>这还是段文字</p>
    </template>
</div>
<script>
    const app = new Vue({
        el: '#app',
        data: {
            status: 1
        }
    })
</script>
```
* 出于效率的原因,Vue 会尽可能的复用而不是重新渲染. 如果需要重新渲染, 则需要在元素/组件中加上`key`属性
<!-- TODO 插入代码 3. key.html -->
[代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section5/3.key.html)
### v-show
* v-show的用法与 v-if类似
* 并不是销毁, 而是添加内联样式:`display: none`
* 不能在`template` 上使用

### v-if 和 v-show 的选择
* `v-if` 适用于条件不经常改变的场景, 因为它切换开销相对较大
* `v-show` 适用于频繁切换条件

## v-for 循环指令
### 数组 v-for
* 对于多个元素可以使用`<template></template>`
* `v-for="item in items"`
* `v-for = "{item, index} in items"`
### 对象 v-for
* `v-for = "value in items"`
* `v-for = "{value, key} in items"`
* `v=for = "{value, key, index} in items"`
### v-for 可以迭代整数
```html
<div id="app">
    <span v-for = "n in 10"> {{n}} </span>
</div>
```

### 数组更新
* Vue 观察数组变异的方法
    * `push()`
    * `pop()`
    * `shift()`
    * `unshift()`
    * `splice()`
    * `sort()`
    * `reverse()`
* 而其他方法不能直接通过`M`中数据的改变来对`VM`中的视图进行改变
    * `filter()`
    * `concat()`
    * `slice()`
    * 使用非变异的方法的时候, 可以使用新数组来代替原数组
        * 包括上面的但是不限于上面的,还有
            * 通过索引直接修改
                * 解决方法
                    * `Vue.set(app.books, 3, {...})`
                    * 在`webpack`的模式下, `this.$set(app.books, 3, {...})` 此处 `this` 指向的是当前组件
                    * `app.$set(app.books, 3, {...})`
            * 修改数组的 length
                * 解决方法
                    * `app.books.splice(1)`

### 过滤和排序
* 当时在不想修改原数组的情况下则可以使用计算属性

<!-- TODO: 插入代码 4.filterBooks.html -->
[代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section5/4.filterBooks.html)

## 方法与事件
<!-- TODO: 插入代码 5. addClick.html -->
[代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section5/5.addClick.html)
* 可以传入参数`@click=addHandle(10)`
* 可以不传入参数`@click=addHandle()`
* 可以用回调函数的形式绑定事件`@click=addHandle`
    * 此时函数会有一个参数`event`
* Vue 提供了一个特殊的变量`$event`用于访问原生的 DOM 事件.
```html
<div id="app">
    <a href="https://www.apple.cn" @click="handleClick('禁止跳转','hello world',$event)">apple.com</a>
</div>
<script>
    const app = new Vue({
        el: '#app',
        methods: {
            handleClick: function (message, welcome, event) {
                console.log(arguments);
                alert(message);
                alert(welcome);
                event.preventDefault();
            }
        }
    })
</script>
```
<!-- TODO: 插入代码 6.$event.html -->
[代码链接在这儿!!](https://github.com/Xinsen-Zhang/Vue-study/blob/master/codes/section5/6.%24event.html)

### 修饰符
#### 事件修饰符
* Vue 支持一下修饰符
    * `.stop`
    * `.prevent`
    * `.capture`
    * `.self`
    * `.once`
* 举例
    * 组织单击事件冒泡
        * `<a @click.stop="handle">....</a>`
    * 提交事件但是不重载事件
        * `<form @submit.prevent="handle">....</form>`
    * 修饰键可以串联
        *   `<a @click.stop.prevent="handle">....</a>`
    * 添加事件监听时使用捕获模式
        *  `<div @click.capture="handle">....</div>`
    * 只当事件在该元素本身(不包括其子元素)触发时触发回调
        * `<div @click.self="handle">....</div>`
    * 只触发一次, 组件同样适用
        * `<div @click.once="handle">....</div>`
#### keycode
* 只有在 keycode=13 时触发事件
    * `<input @keyup.13="submit">`
*  自己配置具体按键
    * `Vue.config.keyCode.f1 = 112`
        * @keyup.f1
* 除了`keycode`之外还有其他的一些快捷键
    * `.enter`
    * `.tab`
    * `.delete`
        * 捕获"删除"和"退格"键
    * `.esc`
    * `.sapce`
    * `.up`
    * `.down`
    * `.left`
    * `.right`
    * `.ctrl`
    * `.alt`
    * `.shift`
    * `.meta`
* 例子
    * shift + s
        * `<input @keyup.shift.83 = 'handleSave' />`
    * control + click
        * `<div @click.ctrl="doSomething">...</div>`