<template>
  <div class="col-10">
    <div class="input-group">
      <div class="input-group-prepend">
        <!--<span class="input-group-text">Add todos</span>-->
        <label for="add-todo" class="input-group-text">Add todo item</label>
      </div>
      <!--输入的文本框-->
      <!--监听事件,输入回车的时候进行事件的交互-->
      <input type="text" class="form-control" id="add-todo" placeholder="Input todo & press ENTER to add todo lists"
             @keyup.enter="addTodo"
             v-model="name">
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'

  export default {
    name: 'TodoHead',
    data () {
      return {
        name: ''
      }
    },
    methods: {
      addTodo () {
      let name = this.name
      if (!name) {
        return
      }
      let id = (new Date()).getTime()
      let finished = false
      let checked = false
      let todo = {
        id,
        finished,
        checked,
        name
      }
      PubSub.publish('addTodo', todo)
      this.name = ''
      }
    }
  }

</script>

<style scoped>

</style>
