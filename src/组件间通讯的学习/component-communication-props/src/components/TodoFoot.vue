<template>
  <div class="col-10">
    <div v-if="todoItems.length > 0" class="input-group">
      <div class="list-group-item list-group-item-action">
        <div class="row align-items-center">
          <div class="col-1">
            <input type="checkbox" :checked="isAllChecked" @click="checkAll">
          </div>
          <div class="col-4">
            <span>FINISHED {{finishedCount}}/{{todoItems.length}}</span>
          </div>
          <div class="col-7">
            <button class="btn btn-outline-danger invisible" @click="deleteChecked">DELETE SELECTED</button>
            <button class="btn btn-outline-success invisible" @click="finishChecked">FINISH SELECTED</button>
            <button class="btn btn-outline-danger invisible" @click="deleteFinished">DELETE FINISHED</button>
          </div>
        </div>
      </div>
    </div>
    <!--<div v-else></div>-->
  </div>
</template>

<script>
  export default {
    name: 'TodoFoot',
    props: {
      todoItems: {
        type: Array,
        required: true
      },
      isAllChecked: {
        type: Boolean,
        required: true,
        default: false
      },
      checkAll: {
        type: Function
      }
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
        this.todoItems.forEach((element) => {
          if (element.checked) {
            element.finished = true
            element.checked = false
          }
        })
      },
      deleteChecked: function () {
        let deleteIndex = []
        this.todoItems.forEach((element, index) => {
          if (element.checked) {
            deleteIndex.unshift(index)
          }
        })
        deleteIndex.forEach((element) => {
          this.todoItems.splice(element, 1)
        }, this)
      },
      deleteFinished: function () {
        let deleteIndex = []
        this.todoItems.forEach((element, index) => {
          if (element.finished) {
            deleteIndex.unshift(index)
          }
        })
        deleteIndex.forEach((element) => {
          this.todoItems.splice(element, 1)
        }, this)
      }
    },
    watch: {
      allFinished: function (newVal) {
        if (newVal) {
          if (this.isAllChecked) {
            this.checkAll()
          }
        }
      }
    }
  }

</script>

<style scoped>

</style>
