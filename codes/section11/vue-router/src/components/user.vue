<template>
  <div>
    <h1>user id: {{userId}}</h1>
    <ul>
      <router-link to="/index" tag="li">跳转到index 的 li 标签</router-link>
      <router-link to="/about" tag="li" replace>跳转到 about 的 li 标签</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    userId () {
      return this.$route.params.id
    }
  }
}
</script>
