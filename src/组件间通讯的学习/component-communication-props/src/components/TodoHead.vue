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
  // import sessionUtil from '../utils/SessionStorage'
  export default {
    name: 'TodoHead',
    data () {
        return {
          name: ''
        }
    },
    methods: {
      addTodo () {
        let item = {
          name: this.name,
          checked: false,
          finished: false,
          id: (new Date()).getTime()
        }
        this.todoItems.unshift(item)
        this.name = ''
      }
    },
    // 父子组件间通信
    props: {
      todoItems: {
        type: Array,
        required: true
      }
    }
  }

</script>

<style scoped>

</style>
