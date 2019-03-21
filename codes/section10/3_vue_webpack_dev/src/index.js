// 导入必要的资源
import Vue from 'vue'
import App from './App.vue' //相对路径
// import vTitle from './components/title.vue'

new Vue({
    el: '#app',
    // render: function (createElement) {
    //     return createElement(App)
    // }
    render: h => h(App)
})