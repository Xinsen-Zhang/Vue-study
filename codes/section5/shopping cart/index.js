// Vue 实例以及代码业务
const app = new Vue({
    el: '#app',
    // data 里面的数据应该是通过 Ajax 来获取
    data: {
        list: [
            {
                id: 1,
                name: 'iPhone 7',
                price: 6188,
                count:1
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count:1
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count:1
            }
        ]
    },
    methods: {
        handleRemove: function (index) {
            this.list.splice(index, 1);
        },
        handleAdd: function (index) {
            this.list[index].count ++;
        },
        handleReduce: function (index) {
            if (this.list[index].count === 1) {
                return;
            }
            this.list[index].count --;
        }
    },
    computed: {
        totalPrice: function () {
            let price = 0;
            for(var i = 0; i < this.list.length; i++){
                price += this.list[i].price * this.list[i].count;
            }
            price = price.toString()
            return price.replace(/\B(?=(\d{3})+$)/g, ',');
        }
    }
})