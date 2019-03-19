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