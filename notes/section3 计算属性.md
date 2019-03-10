# 计算属性
模板内的表达式常用原图简单的运算, 当期过长或逻辑复杂时, 会难以维护, 本章的计算属性就是用于解决该问题的.

TODO: fast in 代码链接
## 计算属性的使用
* 计算属性可以有 `getter` 和 `setter`
    * 一般来说只需要使用 `getter`
        * 所以可以直接定义方法, 就是 `getter`
    * `get` 对应于 `getter` 方法
    * `set` 对应于 `setter` 方法
    * 
TODO 2. setter 的 代码链接
* 计算属性可以依赖别的实例中的数据
    * 
TODO: 代码见 3. data in another instance.html

## 计算属性的缓存
* 与 methods 相比较, 计算属性是基于他的依赖缓存的.
    * 换句话说, 依赖的数据发生改变才会重新计算, 不改变则不进行计算
    * 一次以下的代码中的 `date` 不是响应式的
    ```javascript
    const app = new Vue({
        el: '#app',
        computed: {
            date: function () {
                return new Date();
            }
        }
    })
    ```