<template>
  <div class="container border py-2 mt-5">
    <h1 class="text-center">To do list</h1>
    <div class="row justify-content-center">

      <!--todo head 组件-->
      <todo-head :todo-items='todoItems'/>
      <!--分隔-->
      <div class="w-100 p-1"></div>

      <!--todo main 组件-->
      <todo-main :todo-items='todoItems' :is-all-checked='isAllChecked' />
      <!--分隔-->
      <div class="w-100 p-1"></div>

      <!--todo foot组件-->
      <todo-foot :todo-items='todoItems' :is-all-checked='isAllChecked' :checkAll='checkAll'/>
      <!--分隔-->
      <div class="w-100 p-1"></div>

    </div>
  </div>
</template>

<script>

  import TodoHead from './components/TodoHead'
  import TodoMain from './components/TodoMain'
  import TodoFoot from './components/TodoFoot'
  import storageUtils from './utils/localStorage'

  export default {
    name: 'App',
    components: {
      TodoHead,
      TodoMain,
      TodoFoot
    },
    data () {
      return {
        todoItems: [],
        isAllChecked: false
      }
    },
    methods: {
      checkAll: function () {
        this.isAllChecked = !this.isAllChecked
      }
    },
    computed: {
      todoNum: function () {
        return this.todoItems.length
      }
    },
    watch: {
      todoItems: {//  监控 todoItems
        deep: true,
        handler: function () {
          storageUtils.saveTodos(this.todoItems)
        }
      }
    },
    mounted () {
      this.todoItems = storageUtils.readTodos()
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
