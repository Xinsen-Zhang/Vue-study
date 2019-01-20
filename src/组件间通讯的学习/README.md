# 组件间通信的整理
## 准备工作
### 静态网页的制作  
* 先制作 index.html(未使用 vue 的情况下)
    <div align="center">
        <img src='https://img2018.cnblogs.com/blog/1591103/201901/1591103-20190120172823745-2038331321.png' alt='index-demo' width='600'>
    <div>

* 说明
    1. 组建的划分
        * 1个父组件
            * App
        * 3个子组件
            * TodoHead
            * TodoMain
            * TodoFoot
    2. 数据的交互
        * 头部组件中输入想要添加的内容,按回车进行添加
        * main 组件中鼠标移动显示 `完成` 和 `删除` 功能按钮
        * foot 组件有全选功能,批量完成或者批量删除功能
    3. 页面的说明
        * 完成的事件显示的是黄色的(与删除的功能明显不同)

### vue-cli 快速启动工程  
* 暂时不需要使用路由
* 对静态页面 index.html 进行组件的拆分
    * 拆分后的描述可见不同工程文件中 `README.md`部分

## 组件间通信
### 最基础的通信方法
#### :bind(数据的单向绑定) 和 props 进行通信(数据的反向绑定)
#### 特点
1. 反向绑定是父子间通信
2. 非父子间很麻烦

#### API
* 可以直接写入需要
```javascript
props: {
  todoItems
}
```

* 类型的选择

```javascript
props: {
  todoItems: [Object, String]
}

```

* 是否必须以及默认值

```javascript

props: {
  todoItems: {
    type: Object,
    required: true,
    default: {}
  }
}
```

* 能够增加验证参数`validate`

#### 使用props 来完成 TODO LIST 的开发
* 思考
    1. 由于head,main 和 foot 各个组件之间都需要通信,因此利用 App 作为父组件,将它们三个作为子组件
    2. 用于使用的是 props 进行通信
        * 如果直接在子组件中修改非引用类型的 props 中的数据的话会报错误
        * 因此可以将子组件中对 props 数据进行操作的函数定义在父组件中
        * 通过父子组件间通信的方式将操作子组件中 props 里的数据的方法传递给子组件

#### bus 总线订阅

#### 原理

* 通过实例化一个空的 Vue 实例`vm`
* 在 `vm`内绑定数据
* `vm$on`监听事件
* `vm$emit`触发事件