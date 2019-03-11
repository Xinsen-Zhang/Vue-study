# 表单与 v-model
## 基本用法
`Vue.js` 提供了`v-model`指令, 用于在表单类元素上双向绑定数据
* input
    * 对于汉字如果需要实时更新的话可以使用`@input`来替代`v-model` TODO: 代码见3. input handle.html
TODO: 代码 1.input.html
* textarea
    * 不再关心初始化时 value 属性
TODO: 2.textarea.html
* 单选按钮`input:radio`
    * 单独使用的时候不需要使用`v-model`, 只需要单向绑定一个数据到`checked`属性上即可 TODO: 插入代码4. single radio.html
    * 互斥的效果的话则需要使用`v-model` TODO: 5.互斥效果.html
* 复选框`input:checkbox`
    * 单独使用的时候`v-model` TODO: 6. single checkbox.html
    * 多个一起使用的时候类似于单选框 TODO: 7. multiple checkboxes.html
        * 绑定到一个数组里面
            * 选中 => `push`
            * 没选中 => `splice`
* 选择列表 `select-option`
    * 单选和多选 TODO: 插入 代码链接 8.select single.html
        * 设置了`value`
            * `v-model` 绑定了 `option` 元素上的 `value`
        * 没设置`value` 
            * `v-model` 绑定了 `option` 元素上的 `text`
    * 与`v-for`结合, `text` 和 `value` 也通过`v-bind` 绑定到视图模型上

## 绑定值
`v-model` 和 `v-bind` 结合使用 ?
### 单选框 
* `:` 和 `v-model` 的结合使用    TODO: 插入代码链接, 10. binding a value on radio.html
    * 此时 `app.picked === app.value` => `true`
### 复选框 
* `:` 和 `v-model` 的结合使用    TODO: 插入代码链接, 11. binding a value on checkbox.html
    * 在`input:checkbox` 上面可以动态绑定两个属性`true-value` 和 `false-value`
        * `:true-value="value1"` 和 `:false-value=value2`
        *  选中的时候`app.picked = app.value1`
        * 没选中的时候 `app.picked = app.value2`
    
### 选择列表
TODO: 选择列表内容的编写 12. bind a value on selection by an object.html

## 修饰符
### `.lazy`
* 此时`v-model`绑定的数据并不会实时更新, 按回车或者失焦才会更新
    * 在 `change` 事件中同步
### `.number`
* 转化成数字
### `.trim`
* 消除空格