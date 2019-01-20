<template>
  <div class="col-10">
    <div v-if="todoItems.length > 0" class="input-group">
      <div class="list-group-item list-group-item-action">
        <div class="row align-items-center">
          <div class="col-1">
            <input type="checkbox" :checked="isAllChecked" @click="checkAll" :class="{'invisible': allFinished, 'disabled': allFinished}">
          </div>
          <div class="col-4">
            <span>FINISHED {{finishedCount}}/{{todoItems.length}}</span>
          </div>
          <div class="col-7">
            <button class="btn btn-outline-danger invisible" @click="deleteChecked" :class="{'invisible': allFinished, 'disabled': allFinished, opacity_: allFinished}">DELETE SELECTED</button>
            <button class="btn btn-outline-success invisible" @click="finishChecked" :class="{'transparent': allFinished, 'disabled': allFinished, opacity_: allFinished}">FINISH SELECTED</button>
            <button class="btn btn-outline-danger invisible" @click="deleteFinished">DELETE FINISHED</button>
          </div>
        </div>
      </div>
    </div>
    <!--<div v-else></div>-->
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  export default {
    name: 'TodoFoot',
    data: () => {
      return {
        todoItems: [],
        isAllChecked: false
      }
    },
    mounted () {
      PubSub.subscribe('publishAllItems', (msg, items) => {
        this.todoItems = items
      })

      PubSub.subscribe('allIsChecked', (msg, flag) => {
        this.isAllChecked = flag
      })
    },
    computed: {
      finishedCount: function () {
        return this.todoItems.reduce((preTotal, item) => {
          return preTotal + (item.finished ? 1 : 0)
        }, 0)
      },
      allFinished: function () {
        return this.finishedCount === this.todoItems.length
      }
    },
    methods: {
      finishChecked: function () {
        PubSub.publish('finishChecked')
      },
      checkAll: function () {
        this.isAllChecked = !this.isAllChecked
        PubSub.publish('checkAll', this.isAllChecked)
      },
      deleteChecked: function () {
        PubSub.publish('deleteChecked')
      },
      deleteFinished: function () {
        PubSub.publish('deleteFinished')
      }
    }
  }

</script>

<style scoped>
  div button.btn.opacity_ {
    opacity: 0 !important;
  }
</style>
