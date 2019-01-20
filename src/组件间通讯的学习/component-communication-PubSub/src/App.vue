<template>
  <div class="container border py-2 mt-5">
    <h1 class="text-center">To do list</h1>
    <div class="row justify-content-center">

      <!--todo head 组件-->
      <todo-head/>
      <!--分隔-->
      <div class="w-100 p-1"></div>

      <!--todo main 组件-->
      <todo-main />
      <!--分隔-->
      <div class="w-100 p-1"></div>

      <!--todo foot组件-->
      <todo-foot :todo-items='todoItems'/>
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
  import PubSub from 'pubsub-js'

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
          // 一旦 todoItems 发成变化就发布它
          PubSub.publish('publishAllItems', this.todoItems)
        }
      }
    },
    mounted () {
      this.todoItems = storageUtils.readTodos()
      // 订阅从 head 组件发送过来的信息
      PubSub.subscribe('addTodo', (msg, todoItem) => {
        this.todoItems.unshift(todoItem)
      })

      // 订阅 main 组件发送过来的完成的 index
      PubSub.subscribe('finishItem', (msg, index) => {
        this.todoItems[index].finished = true
      })

      // 订阅 main 组件发送过来的删除的 index
      PubSub.subscribe('deleteItem', (msg, index) => {
        this.todoItems.splice(index, 1)
      })

      // 订阅从 foot 组件发送过来的选中所有内容的消息
      PubSub.subscribe('checkAll', (msg, value) => {
        if (value) {
          this.todoItems.forEach((element) => {
            if (element.finished) {
              element.checked = false
            } else {
              element.checked = true
            }
          }, this)
        } else {
          this.todoItems.forEach((element) => {
            element.checked = false
          })
        }
      })

      // 订阅 finishChecked 的消息, 即将所有选中的 item => finish
      PubSub.subscribe('finishChecked', () => {
        this.todoItems.forEach((element, index) => {
          if (element.checked) {
            element.checked = false
            PubSub.publish('finishItem', index)
          }
        })
      })

      // 订阅 deleteFinished 的消息
      PubSub.subscribe('deleteFinished', () => {
        let index_ = []
        this.todoItems.forEach((element, index) => {
          if (element.finished) {
            index_.unshift(index)
          }
        })
        index_.forEach((element) => {
          PubSub.publish('deleteItem', element)
        })
      })

      // 订阅 deleteChecked 的消息
      PubSub.subscribe('deleteChecked', () => {
        let index_ = []
        this.todoItems.forEach((element, index) => {
          if (element.checked) {
            index_.unshift(index)
          }
        })
        index_.forEach((element) => {
          PubSub.publish('deleteItem', element)
        })
      })
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
