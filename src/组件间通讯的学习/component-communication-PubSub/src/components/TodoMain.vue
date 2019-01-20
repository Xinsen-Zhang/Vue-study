<template>
  <div class="col-10">
    <div class="list-group" v-if="todoItems.length > 0">
      <!--.bg-warning 表示已经完成-->
      <div v-for="(item, index) in todoItems" class="list-group-item list-group-item-action" :class="{'bg-warning': item.finished}" :key="index">
        <div class="row align-items-center" @click="handleChecked(index)">
          <div class="col-1">
            <input type="checkbox" :disabled="item.finished" v-model="item.checked" :class="{invisible: item.finished}">
          </div>
          <div class="col-8">
            <span class="">{{item.name}}</span>
          </div>
          <div class="col-3">
            <button class="btn btn-outline-success invisible" :class="{'disabled': item.finished, opacity_: item.finished}" @click="finishItem(index)">FINISH</button>
            <button class="btn btn-outline-danger invisible" :class="{'disabled': item.finished, opacity_: item.finished}" @click="deleteItem(index)">DELETE</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-info font-weight-bolder text-center">
      PLEASE ADD A TODO
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'

  export default {
    name: 'TodoMain',
    data: () => {
      return {
        todoItems: []
      }
    },
    methods: {
      finishItem (index) {
        // 将完成的事情的 index 发还给 App
        PubSub.publish('finishItem', index)
      },
      deleteItem (index) {
        const flag = confirm(`Bu sure to delete the todo item: ${this.todoItems[index].name}`)
        if (flag) {
          PubSub.publish('deleteItem', index)
        }
      },
      handleChecked (index) {
        this.todoItems[index].checked = !this.todoItems[index].checked
      }
    },
    mounted () {
      PubSub.subscribe('publishAllItems', (msg, items) => {
        this.todoItems = items
      })
    },
    computed: {
      checkedNum: function () {
        return this.todoItems.reduce((preTotal, item) => {
          return preTotal + (item.checked ? 1 : 0)
        }, 0)
      },
      isAllChecked: function () {
        return this.checkedNum === this.todoItems.length
      }
    },
    watch: {
      isAllChecked: {
        deep: true,
        handler: function (newVal) {
            PubSub.publish('allIsChecked', newVal)
        }
      }
    }
  }
</script>

<style scoped>
  div button.btn.opacity_ {
    opacity: 0 !important;
  }
</style>
