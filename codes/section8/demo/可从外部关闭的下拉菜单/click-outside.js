Vue.directive('clickoutside', {
    bind: function(el, binding) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                // console.log('xixixi')
                return false
            }
            if(binding.expression) {
                // 执行关闭函数
                // binding.value(e)
                binding.value()
            }
        }
        el.__clickOutside__ = documentHandler
        document.addEventListener('click', el.__clickOutside__)
    },
    unbind: function(el, binding) {
        document.removeEventListener('click', el.__clickOutside__)
        delete el.__clickOutside__
    }
})