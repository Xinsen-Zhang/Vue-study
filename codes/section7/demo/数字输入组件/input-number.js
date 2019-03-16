// 检测是否是数字的函数
const isNumber = function (value) {
    /*
    正负: -?
    数字可以分为三种
    小数 [0-9]+\.\d+
    整数(neq 0) [1-9][0-9]*
    整数(eq 0) 0{1}
    */
    return (/(^-?[0-9]+\.\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '')
}
// Vue 自检的注册
Vue.component('input-number', {
    // currentValue: 组件上的
    // 
    template: `
                <div class="input-number">
                    <input type="text" v-model="currentValue" @change="handleChange">
                </div>
    `,
    // props 的校验
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    // data
    data: function () {
        return {
            currentValue: this.value
        }
    },
    // watch
    watch: {
        currentValue: function (newValue) {
            this.$emit('input', newValue)
            this.$emit('on-change', newValue)
        },
        value: function (newValue) {
            this.updateValue(newValue)
        }
    },
    methods: {
        updateValue: function (newValue) {
            let val = newValue
            val = newValue > this.max ? this.max : newValue
            val = newValue < this.min ? this.min : newValue
            this.currentValue = val
        },
        // change
        handleChange: function (event) {
            let val = event.target.value.trim()
            const max = this.max
            const min = this.min
            if (isNumber(val)) {
                val = val > max ? max : val
                val = val < min ? min : val
            }
            

        }
    },
    // mounted
    mounted: function () {
        this.updateValue(this.value)
    }
})