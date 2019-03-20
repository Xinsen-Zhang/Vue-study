// 实例化组件
const app = new Vue({
    el: '#app',
    data: {
        data: {}
    }
    methods:{
        changeItem (type_) {
            if (type_ === 'text') {
                this.data = {
                    type: 'text',
                    content: '这是一个纯文本'
                }
            }
            else if (type_ === 'image') {
                this.data = {
                    type: 'image',
                    url: ''
                }
            }
        }
    }
})