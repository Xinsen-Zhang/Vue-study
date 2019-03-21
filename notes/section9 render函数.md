<!-- TODO: 1. domProps 和 attrs 的区别 -->
<!-- TODO: 2. createElement 中的 props 和组件中直接使用的 props 之间的区别 -->

<!-- TOC -->
<!-- - [第九章 render 函数](#%E7%AC%AC%E4%B9%9D%E7%AB%A0-render-%E5%87%BD%E6%95%B0)
  - [什么是Virtual DOM](#%E4%BB%80%E4%B9%88%E6%98%AFvirtual-dom)
    - [VNode](#vnode)
      - [tag](#tag)
      - [data](#data)
      - [children](#children)
      - [text](#text)
      - [elm](#elm)
      - [ns](#ns)
      - [content](#content)
      - [functionalContext](#functionalcontext)
      - [key](#key)
      - [componentOptions](#componentoptions)
      - [child](#child)
      - [parent](#parent)
      - [raw](#raw)
      - [isStatic](#isstatic)
      - [isRootInsert](#isrootinsert)
      - [isComment](#iscomment)
      - [isCloned](#iscloned)
      - [isonce](#isonce)
    - [VNode 的分类](#vnode-%E7%9A%84%E5%88%86%E7%B1%BB)
  - [什么是 Render 函数](#%E4%BB%80%E4%B9%88%E6%98%AF-render-%E5%87%BD%E6%95%B0)
  - [creatElememnt](#createlememnt)
    - [基本用法](#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
    - [关于 render 函数的一些约束](#%E5%85%B3%E4%BA%8E-render-%E5%87%BD%E6%95%B0%E7%9A%84%E4%B8%80%E4%BA%9B%E7%BA%A6%E6%9D%9F)
    - [使用 JS 代替模板功能](#%E4%BD%BF%E7%94%A8-js-%E4%BB%A3%E6%9B%BF%E6%A8%A1%E6%9D%BF%E5%8A%9F%E8%83%BD)
      - [`v-if`](#v-if)
      - [v-for](#v-for)
      - [v-model](#v-model)
      - [修饰符](#%E4%BF%AE%E9%A5%B0%E7%AC%A6)
      - [slot 的备用分发内容](#slot-%E7%9A%84%E5%A4%87%E7%94%A8%E5%88%86%E5%8F%91%E5%86%85%E5%AE%B9)
  - [函数化组件](#%E5%87%BD%E6%95%B0%E5%8C%96%E7%BB%84%E4%BB%B6) -->

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
* 错误2. 重复使用带有组件的 slot
```html
<div id="#app">
  <ele>
  <!-- render 需要在组件里面 -->
    <div>
    <!-- slot -->
      <child></child> <!--组件-->
    </div>
  <ele>
</div>

<script>
// 全局注册组件 child  正确的使用
  Vue.component('child', {
    render: function (createElement) {
      return createElement('p', 'text')
    }
  })

  // 现在开始错误的使用 render
  Vue.component('ele', {
    render: function (createElement) {
      return createElement('div', [this.$slots.default,
      this.$slots.default])
    }
  })

// 实例化
  const app = new Vue({
    el: '#app'
  })
</script>
```

关于上面的问题的解决方法
* 重复的组件作为 VNode []
  * 使用`Array.apply(null, {length:5}).map(....)`
```JavaScript
var child = {
  render: function (createElement) {
    return createElement('p', 'text')
  }
}
Vue.component('ele', {
  render: function (createElement) {
    return createElement('div', Array.apply(null, {length: 2}).map(function () {
      return createElement(child)
    }))
  }
})
var app = new Vue({
  el: '#app'
})
```
<!-- TODO: 插入代码链接 4. 重复的 VNode 作为 Array 传入第三个参数.hml-->
* 带组件的 slot
  * 深度克隆节点.(其实就是为了不让数组里指向同一个引用)
```JavaScript
Vue.component('child', {
  render: function (createElement) {
    return createElement('p', 'text')
  }
})

Vue.component('ele', {
  render:function (createElement) {
    // 深度克隆 slot 节点
    function cloneVNode(VNode):
    var child = VNode.children && VNode.children.map(function (vnode) {
      return cloneNode(vnode)
    })
    const cloned = createElement(
      VNode.tag,
      VNode.data,
      child
    )
    cloned.text = VNode.text
    cloned.isComment = VNode.isComment
    cloned.componentOptions = VNode.componentOptions
    cloned.elm = VNode.elm
    cloned.context = VNode.context
    cloned.ns = VNode.ns
    cloned.isStatic = VNode.isStatic
    cloned.key = VNode.key

    return cloned
  }
  const vNodes = this.$slots.default
  const clonedNodes = cloneVNode(vNodes)
  return createElement('div', [vNodes, clonedNodes])
})
```
<!-- TODO: 插入代码链接 5. 重复的带组件的 slot.html -->
### 使用 JS 代替模板功能
不能使用`v-if` 和 `v-for`
#### `v-if`

```html
<div id="app">
  <ele :show="show">
    <button @click="show = !show">  切换 show </button>
  </ele>
</div>
<script>
  Vue.component('ele', {
    render: function (createElement) {
      if (this.show) {
        return createElement('p', 'show 的值是 true')
      }
      else {
        return createElement('p', 'show 的值是 false')
      }
    },
    props: {
      show: {
        type: Boolean, 
        required: true,
        default: true
      }
    }
  })
  // 实例化
  const app = new Vue({
    el: '#app',
    data: {
      show: false
    }
  })
</script>
```
<!-- TODO: 插入代码链接 6.v-if.html -->
#### v-for
```html
     <div id="app">
         <ele :list="list"></ele>
         <button @click= 'handleClick'>切换 list</button>
     </div>
</body>
<script>
const list1 = []
const list2 = [
  'Vue.js 实战',
  'JS 实战',
  'python 实战'
]
Vue.component('ele', {
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  render: function (createElement) {
    if(this.list.length){
      nodes = this.list.map(function (item) {
        return createElement('p', item)
      })
        return createElement('ul', nodes)
    }
    else {
      return createElement('p', '列表为空')
    }
  }
})
const app = new Vue({
  el: '#app',
  data: {
    list: list1
  },
  methods: {
    handleClick: function () {
      if (this.list === list1) {
        this.list = list2
      }
      else {
        this.list = list1
      }
    }
  }
})
</script>
```
#### v-model
`render`里面也没有 `v-model`的api
#### 修饰符
修饰符也无法使用, 需要使用句柄
<!-- TODO: 事件冒泡和事件捕获 -->

- [ ] 事件冒泡和事件捕获 

| 修饰符 | 句柄 | 说明|
|-------|------|----|
|.stop|event.stopPropagation|阻止事件冒泡|
|.prevent|event.preventDefault|阻止默认事件|
|.self|if(event.target !== event.currentTarget) reuturn ; | 事件恰好是自身时触发|
|.enter,.13| if(event.keyCode !== 13) return ; | 按下回车键的时候触发 |
|.ctrl, .alt, .shift, .meta | if(!event.ctrlKey) return ; 可替换按键 | 按下特殊按键的时候触发|
|.capture | ! | 事件捕获|
|.once | ~ | 只触发一次 |
|.capture.once 或者 .once.capture | ~! | 第一次事件捕获时触发 |
<!-- TODO: 插入代码 9. chatting imitation.html -->
#### slot 的备用分发内容
如果slot为空, 在使用 `template` 的时候,可以在 `template` 中添加默认分发的备用内容. 可是如果使用`render`的话, 需要使用 js 进行逻辑判断, 不能直接定义备用的分发内容了
* `this.$slots.default === undefined` => 组件中, 未命名的(默认) slot 没有被使用
<!-- TODO: 插入代码 10. spare dispatch content in slot.html -->


## 函数化组件
* Vue.js 提供了一个 `functional` 的布尔值, 设置为 `true` 时可以使组件无状态和无实例, 也就是没有 `data` 和 `this` 上下文. 这样用 `render` 函数返回虚拟节点可以更容易渲染, 因为函数化组件只是一个函数, 渲染开销要小很多
* 在使用函数化组件的时候, `render` 函数提供饿了第二个参数`context`来提供临时上下文. 组件需要的`data`, `props`, `parent`, `children`, `slot`都是通过这个上下文来进行传递的.e.g. 
  * `this.level` => `context.props.level`
  * `this.$slots.default` => `context.children`
<!-- TODO: 插入代码链接 11. select component via data inteligently.html -->
> 注意:三个组件对象都接收了一个`props: data`. 在组件 `ele` 中也有`props:data`, 此时通过 `getComponent()` 来确定具体选择哪一个组件进行渲染.  
> 将 `getComponent()`的结果作为一个组件选项的对象传入`createElement`的第一个参数当中, 这时候通过把`data`作为 props 传给第二个参数, 这样子就可以传递给更里面的组件.  
> 函数化组件的一个解决方法是可以用指令`is`进行替代  

函数化组件主要适用于以下的两种情况
1. 程序化的在多个组件中选择一个
2. 再将`children`, `props`, `data` 传递给子组件之前操作它们


<!-- ## JSX  -->
<!-- TODO: JSX 相关内容的补全 -->