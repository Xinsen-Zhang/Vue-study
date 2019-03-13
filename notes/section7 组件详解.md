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