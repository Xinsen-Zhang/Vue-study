<template>
  <div>{{userId}}</div>
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
