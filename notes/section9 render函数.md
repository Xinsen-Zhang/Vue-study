<!-- TODO: 1. domProps 和 attrs 的区别 -->
<!-- TODO: 2. createElement 中的 props 和组件中直接使用的 props 之间的区别 -->
# 第九章 render 函数
## 什么是Virtual DOM
Virtual DOM 并不是真正意义上的 DOM, 而是一个轻量级的 JavaScript 对象, 在状态发生改变的时候, Virtual DOM 会进行`Diff`运算, 来更新只需要被替换的 DOM, 而不是全部都进行重绘.
<!-- TODO: 插入 Virtual  Dom运行过程的示意图 -->
用 Virtual DOM 创建的 JavaScript 对象一般如下,
```JavaScript
var vNode = {
    tag: 'div',
    attributes: {
        id: 'main'
    },
    children: {
        // p 节点
    }
}
```
### VNode
VNode 对象通过一些特定的选项描述了真实的 DOM
在`Vue.js` 中每一个元素或者组件都对应一个 VNode 对象.源码中的定义如下
```JavaScript
export interface VNode {
    tag?:String;
    data?:VNodeData;
    children?:VNode[];
    text?:String;
    elm?:Node;
    ns?:String;
    context?:Vue;
    key?: String | Number;
    componentOptions?:VNodeComponentOptions;
    componentInstance?:Vue;
    parent?:VNode;
    row?: Boolean;
    isStatic?: Boolean;
    isRootInsert?: Boolean;
    isComment?: Boolean;
    ...
}
```
#### tag
标签名
#### data
数据对象
```JavaScript
export interface VNodeData {
    key?: String | Number;
    slot?: String;
    scopedSlot?:{[key: String]: scopedSlot};
    ref?: String;
    tag?: String;
    staticClass?: String;
    class?: any;
    staticStyle:{[key: String]: any};
    style?: Object[] | Object;
    props?: {[key: String]: any};
    attrs?: {[key: String]: any};
    domProps?: {[key: String]: any};
    hook?: {[key: String]: Function};
    on?: {[key: String]: Function [] | Function};
    nativeOn?: {[key: String]: Function | Function []};
    transition?: Object;
    show?: Boolean;
    inlineTemplate?:{
        render: Function,
        staticRenderFns: Function []
    };
    directives?: VNodeDirective [];
    keepAlive:? Boolean;
}
```
#### children
子节点, 数组, 也是 VNode 类型
#### text
当前节点的文本, 一般文本节点或注释节点会有该属性
#### elm
当前虚拟节点对应的真实的 DOM 节点
#### ns
节点的 namespace
#### content
编译作用域
#### functionalContext
函数化组件的作用域
#### key
节点的 key 属性,用于节点的标识, 有利于 patch 的优化
#### componentOptions
创建组件时用到的选项信息
#### child
当前节点对应的组件实例
#### parent
组件的占位节点
#### raw
原始html
#### isStatic
静态节点的标识
#### isRootInsert
是否作为根节点被插入
被`<transition>`包裹的节点, 该属性为 false
#### isComment
当前节点是否是注释节点
#### isCloned
当前节点是否是克隆节点
#### isonce
当前节点是否有 `once` 指令
### VNode 的分类
* TextVNode
    * 文本节点
* ElementVNode
    * 普通元素节点
* ComponentVNode
    * 组件节点
* EmptyVNode
    * 没有内容的注释节点
* CloneVNode
    * 克隆节点, 可以是以上的任意节点, 唯一的区别在于`isCloned`的属性为`true`

<!-- RENDER MODULE -->
## 什么是 Render 函数
<!-- TODO: 插入代码链接 1. fast in render function.html -->
## creatElememnt
### 基本用法
```JavaScript
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签, 组件选项, 或者一个函数
  // 必须return 一个标签或者一个组件选项
  'div',
  // {Object}
  // 一个对应属性的数据对象, 可选
  // 您可以在 template 中使用
  {
    //
  },
  // {String | Array},
  // 子节点,可选
  [createElement('h1', 'hello world'),
  createElement('myComponent', {
    props: {
      someProp: 'foo'
    }
  }),
  'bar'
  ]
)
```
对于数据对象的用法如下:
```JavaScript
// 数据对象的用法
object = {
  // 和 v-bind 的用法一样
  class: {
    foo: true,
    bar: false
  },
  // 和 v-bind 一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 属性
  attrs: {
    id: 'foo'
  },
  // 组件的 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 自定义事件监听器'on'
  // 不支持如 v-on: keyup.enter 的修饰符
  // 需要手动匹配 enter
  on: {
    click: this.clickHandler
  },
  // 仅对于组件, 用于触发原生事件
  // 而不是用 vm.$emit 触发的事件
  nativeOn: {
    click: this.nativeClickhandler
  },
  // 自定义指令
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1+ 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域 slot
  // {name: props => VNode | VNode[]}
  scopedSlots: {
    default: props => h('span', props.text)
  },
  // 如果子组件有定义 slot 的名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}
```
* 实例
<!-- TODO: 2. template version.html -->
如果使用 template
```html
<div id="app">
        <ele></ele>
    </div>
    <script>
        Vue.component('ele', {
            template: `
            <div id="element"
            :class="{show: show}"
            @click="handleClick"> 文本内容 </div>
            `,
            data: function () {
                return {
                    show: true
                }
            },
            methods: {
                handleClick: function () {
                    // this.show = !this.show
                    window.alert('clicked!')
                }
            }
        })

        const app = new Vue({
            el: '#app'
        });
```
<!-- TODO: 3. render version .html -->
使用 render 函数的话
```JavaScript
Vue.component('ele', {
    // template: `
    // <div id="element"
    // :class="{show: show}"
    // @click="handleClick"> 文本内容 </div>
    // `,
    render: function (creatElement) {
        return creatElement('div', {
            attrs: {
                id: 'element'
            },
            class: {
                show: this.show
            },
            on: {
                click: this.handleClick
            }
        }, "文本内容")
    },
    data: function () {
        return {
            show: true
        }
    },
    methods: {
        handleClick: function () {
            // this.show = !this.show
            window.alert('clicked!')
        }
    }
})
```

### 关于 render 函数的一些约束
如果 VNode 是组件或者是含有组件的 slot, 那么 VNode 必须唯一
* 错误1. 组件的重复使用
```JavaScript
// 组件选项
var child = {
    render: function (createElement) {
        return createElement('p', 'text')
    }
}
// 注册组件
Vue.component('ele', {
    render: function (createElement) {
        // 创建一个子节点, 使用组件
        const childNode = createElement(child)
        return createElment('div', [childNode, childNode])
    }
})
// 实例化组件
const app = new Vue({
    el: '#app'
})
```