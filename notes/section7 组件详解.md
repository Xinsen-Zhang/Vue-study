# 组件详解
组件(component)是`Vue.js`最核心的功能, 也是整个框架设计最核心的地方
## 组件和复用
### 组件的用法
组件需要注册之后才能使用.组件的注册分为局部注册和全局注册.
* 全局注册
    * 注册方法
    ```JavaScript
    Vue.component('my-component', {
        // config
    })
    ```
    * 注册之后就能使用了
    ```html
    <div id="app">
        <my-component><my-component>
    </div>
    <script>
        const app = new Vue({
            el: '#app'
        })
    </script>
    ```
* 在组建中添加`template`的配置就能够显示组件内容了.
    * 用法如下
    ```JavaScript
    Vue.component('my-component', {
        template: '<div>这里是组件的内容</div>'
    })
    ```
    * `template` 的 `DOM` 结构必须被一个元素包含, 如果直接写成`这里是组件的内容`是无法正确的渲染的
* 局部注册
    * 用法如下.
    ```JavaScript
    /*
    局部注册一个组件, 首先写好配置
    */
    const child = {
        template: '<div>局部注册的组建的内容</div>'
    }
    /*
    在视图模型上进行注册
    */
    const app = new Vue({
        el: '#app',
        components: {
            /*
            使用键值对的方式进行局部注册
            */
           'my-component': child
        }
    })

    ```
* 组件的模板受到限制怎么办?
    * 比如在`<table></table>`中的元素只能是`<thead>`,`<tbody>`,`<tr>`之类的, 因此不能直接使用模板
        * 解决方法: 在元素上加上属性`is="my-component"`
        * 插件的受限制的元素还有`<ul>`,`<ol>`和`<select>`等
        * ATTENTION: 如果使用的是字符串模板, 其实是不受限制的2333
        TODO: 插入代码链接: 1. is="my-component".html
* 组件的配置中除了`template` 还能有什么?
    * 和`Vue`实例一致, 也能有`computed`, `methods`, `data`等
        * `data`必须是一个函数, 并且将需要的数据进行返回
            * 原因: 如果 `return` 的是一个外部饮用对象, 则可能会因为组件 A 的修改了数据而导致组件 B 的数据也受到影响
            <!-- TODO: 插入代码 2. data in component.html -->

## 使用 props 传递数据
父子组件间需要通讯, 父子间将数据传递给子组件, 子组件可以依据不用的数据进行不同的渲染
### 基本用法
props 的值可以是两种, 数组或者对象. (子组件接收)
* 数组
    * 直接写道组件的`props`中即可.
        * `props: [message]`
        * 用法
        ```html
        <div id="app">
            <my-component message="hello component"></my-component>
        </div>
        <script>
            Vue.component('my-component', {
                props: ['message'],
                template: '<div>{{message}}</div>'
            })

            const app = new Vue({
                el: '#app',
            })
        </script>
        ```
        <!-- TODO: 插入代码. 3. props in array.html -->
    * 传递的数据可以是动态绑定的 
    ```html
    <div id="app">
        <input type="text" v-model="parentMessage" placeholder="父组件的 v-model">
        <my-component :message="parentMessage"></my-component>
    </div>
    <script>
        Vue.component('my-component', {
            props: ['message'],
            template: '<div>{{message}}</div>'
        })

        const app = new Vue({
            el: '#app',
            data: {
                parentMessage: ''
            }
        })
    </script>
    ```
    <!-- TODO: 插入代码. 4. :message.html -->
    * 动态传入和直接传入的区别
        * 动态传入会自动识别类型
        * 直接传入会作为字符串
    
### 单向数据流
* 父组件传初始值进来, 子组件将其作为初始值保存
    * demo
    ```JavaScript
    data: function () {
        return {
            count: this.initCout
        }
    }
    ```
    <!-- TODO: 插入代码链接5. data initial from props.html -->
* 父组件传入的数据是作为需要被转变的原始值, 则使用计算属性
    <!-- TODO: 插入代码 6. props with computation attributions.html -->

### 数据验证
此时就是将`props`写成对象类型
* demo
```JavaScript
Vue.component('my-component', {
    props: {
        // 必须是数字类型
        propA: Number,
        // 数字或者字符串
        propB: [Number, String],
        // 布尔值, 如果没有定义就是 true
        propC: {
            type: Boolean,
            default: true
        },
        // 数字, 并且必须传入
        propD: {
            type: Number,
            required: true
        },
        // 如果是数组或者对象, 默认值必须要用一个函数来返回
        propE: {
            type: Array,
            default: function () {
                return [];
            }
        },
        // 自定义一个验证器
        propF: {
            validator: function (value) {
                return value > 10
            }
        }
    }
})
```
* 验证的类型
    * `String`
    * `Number`
    * `Boolean`
    * `Object`
    * `Array`
    * `Function`
    * `type` 也可以是一个自定义的构造器, 用`instanceof` 检测

## 组件通信
组件通信关系可以分为父子组件通信, 兄弟组件通信, 跨级组件通信

* 下面讲的主要是父子间的通信, 当然`$emit`也可以用于爷孙之间通信
### 自定义事件
* 子组件用 `$emit()` 来触发事件, 父组件用`$on()` 来监听子组件的事件
    * `$emit()`
        * 第一个参数: 事件名称
        * 后面的参数: 传给监听器的参数
    * `$on()`
        * `@increase`
        * 原生事件可以使用`.native`的修饰符
            * `@click.native="handleClick"`

###  v-model
* `v-model` 在组件上只是一个语法糖
    * `input`事件
    * 将参数更新到绑定的数据上
    * 其实只是一个语法糖
        * `@input="handleInput"`
* 可以创建自定义的表单属性
    * `v-model` => 将数据传递绑定给组件
    * `props=["value"]` => 将数据传递给子组件(表单)
    * `this.$emit('input', event.target.value)` => 触发`input 事件`

### 非父子组件通信
* 使用中央事件总线(bus), 一个空的`Vue` 实例.(其实任意的组件间通讯都可以)
<!-- TODO: 插入代码链接: 10. bus.html -->
* 父链和子索引
    * 父链
        * 在子组件中
            * `this.$parent` 可以访问父组件或者元素, 直至根实例
                * 紧耦合, 不推荐
            * `this.$children` 可以访问它的所有子组件, 直至最内层组件
            <!-- TODO: 插入代码链接: 11. parent chain.html -->
    * 子索引
        * 递归寻找子组件过于麻烦, 可以使用`ref`这个属性给子组件指定一个索引
            * `<my-component ref="comA"><my-component>`
            * `<p ref="P"></p>`
            <!-- TODO: 插入代码链接: 12. ref of child component.html -->
        * 注意:
            * 子组件只在组件渲染之后才会填充, 并且不是响应式的
                * 仅作为直接访问子组件的一个应急措施
                * 不应该在计算属性或者模板中使用 `$refs`

## 使用 slot 分发内容
### 作用域
```html
<my-component>
    {{message}}
</my-component>
```
* 编译的作用域, `message`绑定的是父组件的数据, 而不是组件`my-component`的数据
* 父组件的模板是在父组件的作用域中编译的, 子组件的模板是在子组件的作用域中编译的
* 使用的时候的区别可见下面
#### 绑定在父组件的数据
```html
<div id="app">
    <my-component v-show="showChild"></my-component>
</div>
<script>
    Vue.component('my-component', {
        template: '<div>子组件</div>'
    })
    const app = new Vue({
        el: '#app',
        data: {
            showChild: true
        }
    })
</script>
```
#### 绑定在子组件的数据
```html
<div id="app">
    <my-component></my-component>
</div>
<script>
    Vue.component('my-component', {
        data: function () {
            return {
                showChild: true
            }
        },
        template: '<div v-show="showChild">子组件</div>'
    })
    const app = new Vue({
        el: '#app'
    })
</script>
```

### slot 的用法
* 单个 slot
    * 在子组件的模板中使用`<slot></slot>`开启插槽
    * 子组件中`slot`里的备用内容, 会在没有分发内容的时候显示
        * `slot`里面的备用内容的作用域是子组件
        <!-- TODO: 插入代码 13. single slot.html -->
* 具名 slot
    * 给 `slot` 可以添加一个`name`属性
    * 可以与单个 slot 共存
    * 可以分发多个内容
    <!-- TODO: 插入代码链接 14. named slot.html -->
* 作用域插槽
    * 带 scope 的 slot
    * 可以具名
    * 复用模板, 而不是渲染的元素
        * 父组件的模板
        * 子组件的作用域
    <!-- TODO: 插入代码链接 15. named slot with field.html -->
### slot 的访问
* `$slots`
    * `$slots.nameA`
    * `$slots.default`
    <!-- TODO: 插入代码链接 16. visit slots.html -->

## 组件的高级用法
### 组件的递归调用
* 设置`name`之后就能在组件当中递归调用了
<!-- TODO: 插入代码链接 17. component recursion usage.html -->
### 内联模板
* 给组件添加`inline-template`属性
    * 组件标签间的内容不会作为内容被分发到子组件的插槽中
    * 当做模板进行渲染
    <!-- TODO: 插入代码链接 18. inline template.html -->
### 动态组件
* 回想在受限制的 html 元素内容的时候, 可以使用`is` 属性使用组件
* 现在可以使用动态的`is`属性进行组件的动态选择
    * 使用特殊的元素`component`进行挂载
<!-- TODO: 插入代码链接 19. dynamic change component.html -->
### 异步组件加载
* 在注册组件的时候可以通过一个类似于`promise`的工厂函数进行注册, 实现异步加载
* 只在需要渲染的时候触发工厂函数, 并且会将结果缓存起来, 用于后面的再次渲染
```JavaScript
Vue.component('my-component', function(resolve, reject) {
    window.setTimeout(function () {
        resolve({
            template: '<div>我是异步加载的组件</div>'
        })
    }, 2000)
})
```
* 也可以使用`reject(reason)` 显示失败信息

## 其它
### $nextTick
* `Vue` 在观测到数据变化的时候并不是直接更新 DOM, 而是开启一个队列,并缓冲在同一事件循环中发生的所有数据改变. 在缓冲的同时去除重复的数据, 从而避免不必要的 DOM 操作
* 然后, 在下一个时间循环 tick 中, `Vue` 刷新队列并且执行实际(已去重)的工作.
* 使用`$nextTick(callback)`. 等待进入下一个循环 tick 中再执行回调函数
```JavaScript
methods: {
    getText: function () {
        this.show = true
        this.$nextTick(function () {
            const text = document.getElementById('div').innerHTML
            console.log(text)
        })
    }
}
```
<!-- TODO: 插入代码链接 20. $nextTick.html -->
### X-templates
* 使用方式
    ```html
    <script type="text/x-template" id='component-a">
        // templatecontent
    </script>
    ```
    * 在`template` 中对应 `template: #id`就可以了
<!-- TODO: 插入代码链接 21.x-templates.html -->

### 手动挂载
* 如果在实例化`Vue`对象的时候没有指明`el`键, 则需要手动挂载
    * 技术栈
        * `Vue.extend`
            * 基础Vue 构造器, 能够用来创建"子类"
                * 可以使用`template`
        * `$mount()`
            * 返回实例自身, 因此可以链式调用
    <!-- TODO: 插入代码链接 22. manually mounted an instance.html -->
* 挂载方式:
    * `new MyComponent().$mount('#app')`
    * `new MyComponent({el: '#app'})`
    * 先空白挂载, 再插入
        1. `const component = new MyComponent().$mount()`
        2. `document.getElementById('#app').appendChild(component.$el)`