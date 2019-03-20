// 图像组件选项
const imageItem = {
    props: ['data'],
    render: function (createElement) {
        console.log(this)
        return createElement('div', [
            createElement('p', '图片组件'),
            createElement('img', {
                attrs: {
                    src: this.data.url
                    // TODO: 此处的 this 指向的是什么
                }
            })
        ])
    }
}

// 视频组件选项
const videoItem = {
    props: ['data'],
    render: function (createElement) {
        return createElement('div', [
            createElement('p', '视频组件'),
            createElement('video', {
                attrs: {
                    src: this.data.url,
                    autoplay: 'autoplay',
                    controls: 'controls'
                }
            })
        ])
    }
}

// 纯文本组件选项
const textItem = {
    props: ['data'],
    render: function (createElement) {
        return createElement('div', [
            createElement('p', '纯文本组件'),
            createElement('p', this.data.content)
        ])
    }
}

// 函数化组件的注册
Vue.component('ele', {
    functional: true,
    render(h, context) {
        // 根据传入的数据判断组件的类型
        function getComponent() {
            let data = context.props.data
            if (data.type === 'image') {
                return imageItem
            }
            else if (data.type === 'video') {
                return videoItem
            }
            else if (data.type === 'text') {
                return textItem
            }
        }
        return h(getComponent(), {
            // 把 context 上的数据作为 props 传入
            props: {
                    data: context.props.data
                }
            },
            context.children
        )
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    }
})
// 实例化组件
const app = new Vue({
    el: '#app',
    data: {
        data: {}
    },
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
                    url: './static/dmeo.png'
                }
            }
            else if (type_ === 'video') {
                this.data = {
                    type: 'video',
                    url: './static/dmeo.mp4'
                }
            }
        }
    },
    mounted() {
        this.changeItem('text')
    },
})