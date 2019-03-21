<template>
    <div id="button">
        <h1>
            <a :href="'#' + title" :style="style"> {{title}} </a>
        </h1>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        styleConfig: {
            type: Object,
            required: true,
            default: function () {
                return {};
            }
        }
    },
    data () {
        return {
            style: {
                color: this.styleConfig.color
            }
        }
    },
    mounted () {
        this.$on('vClick', function () {
            console.log('clicked');
        })
    },
    watch: {
        styleConfig: function (newVal) {
            this.style.color = newVal.color
        }
    }
}
</script>

<style scoped>
a,
a:link,
a:visited,
a:hover,
a:active {
    text-decoration: none;
    color: hotpink;
    cursor: pointer;
}
</style>
