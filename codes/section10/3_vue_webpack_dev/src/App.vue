<template>
    <div id="test">
        <p>Hello {{message}}</p>
        <v-title :title="title" :styleConfig="style"></v-title>
        <v-button @vClick="clickHandler"></v-button>
    </div>
</template>

<script>
import vTitle from './components/title.vue'
import vButton from './components/button.vue'
export default {
    data () {
        return {
            message: 'devoloper',
            title: 'vue.js 与 webpack',
            style: {}
        }
    },
    components: {
        vTitle,
        vButton
    },
    methods: {
        getRandomColor () {
            const getRandom = function () {
                return Math.floor(Math.random() * 16).toString(16)
            }
            let color = '#' + Array.apply(null, {length: 6}).map(function () {
                return getRandom()
            }).join('')
            return color
        },
        clickHandler: function () {
            this.style = {color: this.getRandomColor()}
        }
    }
}
</script>

<style scoped>
    #test {
        color: #f50;
        position: relative;
        width: 500px;
        margin: 0 auto;
    }
</style>
