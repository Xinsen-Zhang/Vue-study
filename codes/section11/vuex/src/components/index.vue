<template>
  <div>
    <h1>首页</h1>
    <div>
      <button @click='handleAdd'> + </button>
      <span>vuex 管理的数据: {{count}}</span>
      <button @click='handleReduce'> - </button>
    </div>
    <div>
      随机数是: {{randomNum}}
    </div>
    <!-- <div>-----分隔符-----</div> -->
    <br/>
    <div>vuex 中的 list: {{list}}</div>
    <div>vuex 中的 filteredList: {{filteredList}}</div>
    <div>vuex 中的 sortedAndFilteredList: {{sortedAndFilteredList}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      randomNum: Math.round(Math.random() * 10)
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    list () {
      return this.$store.state.list
    },
    filteredList () {
      return this.$store.getters.filteredList
    },
    sortedAndFilteredList () {
      return this.$store.getters.sortedAndFilteredList
    }
  },
  methods: {
    changeNum () {
      this.randomNum = Math.round(Math.random() * 10)
    },
    handleAdd () {
      this.$store.commit('increment', this.randomNum)
      this.changeNum()
    },
    handleReduce () {
      // this.$store.commit('decrement', this.randomNum)
      this.$store.commit({
        type: 'decrement',
        num: this.randomNum
      })
      this.changeNum()
    }
  }
}
</script>
