# 自定义组件
## 基本用法
* 局部注册
```JavaScript
    const app =new Vue({
        el: '#app',
        directives: {
            focus: {
                // 具体业务逻辑
            }
        }
    })
```
* 全局注册
```JavaScript
Vue.directive('focus', {
    // 具体实现业务
})
```

* 自定义指令是由一系列钩子函数组成的
    * bind
        * 只调用一次, 指令第一次绑定到元素上时调用, 用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
    * inserted
        * 被绑定元素插入父元素时调用(父节点存在即可调用, 不用存在于 document 中)
    * update
        * 被绑定元素所在模板更新时调用, 而不论绑定值是否变化. 通过比较更新前后的绑定值, 可以忽略不必要的模板更新
    * componentUpdated
        * 被绑定元素所在模板完成一次更新周期时调用
    * unbind
        * 只调用一次, 指令与元素解绑时调用
<!-- TODO: 插入代码链接 1. v-focus.html -->
* 钩子函数的参数
    * el
        * html 元素
    * binding
        * 一个对象, 包含以下内容
            * name
                * 指令名, 不包含`v-`, e.g. `focus`
            * value
                * 绑定的指令值
                * 如果`1 + 1`, 则是`2`
            * oldValue
                * `update` 和 `componentUpdated`上可用
            * expression
                * 绑定值的字符串类型
                * 如果`1 + 1`, 则是 `1 + 1`
            * arg
                * 传给指令的参数
                * 如果`v-my-directive:foo`, 则是`foo`
            * modifiers
                * 一个包含修饰符的对象
                * 如果`v-my-directive.foo.bar`, 则是`{foo: true, bar: true}`
    * VNode
    * 上一个 VNode
        * 仅在`update` 和 `componentUpdated` 中可用
    * `undefined`