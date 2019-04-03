<template>
  <div>
    <h1>介绍页</h1>
    <button @click="handleRouter">跳转一个用户页面</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleRouter () {
      this.$router.push('/user/123456')
    }
  }
}
</script>
