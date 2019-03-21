// 导入 vue 框架
import Vue from 'vue'
// 导入组件
import App from './app.vue'

// 创建实例
new Vue({
    el: '#app',
    render: h => h(App)
})

/*
ES6语法糖
render: h => h(App)
等价于
render: function (h) {
    return h(App)
}
等价于
render: h => {
    return h(App)
}
*/