<template>
    <div id="button">
        <button @click="clickHandler">切换颜色</button>
    </div>
</template>

<script>
export default {
    methods: {
        clickHandler () {
            this.$emit('vClick')
        }
    }
}
</script>

<style scoped>
button {
    border-radius: 4px;
}
#button {
    /* position: absolute; */
    width: 100%;
    height: 20px;
    /* left: 50%; */
    margin: 0 auto;
}
</style>
