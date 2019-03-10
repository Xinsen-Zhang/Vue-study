# v-bind 及 class 与 style 绑定
* `v-bind`的作用主要是动态更新 `html`元素上的属性
    * 
TODO: fast in 代码链接
## class的绑定
### 设置一个对象,可以动态的切换 `class`
* e.g. `v-bind: class="{'active': isActive}"`
    * 
TODO  插入代码链接 2. object in with single key
* 对象可以有多个键值对
* 可以使用`data`
* 也可以使用`computed`
* 也可以使用 `methods`
### 数组语法
* 需要应用多个 `class` 的时候可以使用数组语法,给`:class` 绑定数组, 应用一个`class` 列表
```html
<div id='#app'>
    <div :class="[activeCls, errorCls]"></div>
</div>
<script>
    const app = new Vue({
        el: '#app',
        data: {
            activeCls: 'active',
            errorCls: 'error'
        }
    })
</script>
```
*也可以利用三元表达式动态切换 class 的值
```html
<div id='app' :class="[isActive ? activeCls: '', errCls]"></div>
<script>
    const app = new Vue({
        el: '#app',
        data: {
            activeCls: 'active',
            errCls: 'error'
        }
    })
</script>
```

* 同时也可以在数组中使用对象语法
```html
<div id="app" :class="[{'active': isActive}, errCls]"></div>
<script>
    const app = new Vue({
        el: '#app',
        data: {
            isActive: true,
            errCls: 'error'
        }
    })
</script>
``` 
* 与对象绑定的方法一样, 可以使用`data`, `computed` 和 `methods` 三种方法.
    * 
TODO 3. array class by computed method.html
* 列表中的东西, 可以是对应能够取值的时候的键值对的键, 也可以是对应取值的时候简直对中值
    * 
TODO 4. 代码插入 4. name in array.html
### 组件上的使用
* 可以在自定义的组件上使用 class
    * 首先声明一个组件
        * 比如使用全局注册
        ```JavaScript
        Vue.component('my-component', {
            template: '<p class="article">一些文本</p>'
        })
        ```
        * 在组件上使用`:class`
        ```html
        <div id="app">
            <my-component :class="{'active': isActive}"></my-component>
        </div>
        <script>
            const app = new Vue({
                el: '#app',
                data: {
                    isActive: true
                }
            })
        </script>
        ```
## style 的绑定
* style 的绑定和 class 的绑定十分类似
* CSS 属性
    * html 中使用的是 kebab-case
    * Vue 中使用的是 camelCase