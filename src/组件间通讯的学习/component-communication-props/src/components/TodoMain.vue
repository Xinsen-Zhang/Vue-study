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
            <button class="btn btn-outline-success invisible" :class="{'disabled': item.finished}" @click="finishItem(index)">FINISH</button>
            <button class="btn btn-outline-danger invisible" :class="{'disabled': item.finished}" @click="deleteItem(index)">DELETE</button>
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
  export default {
    name: 'TodoMain',
    props: {
      todoItems: {
        type: Array,
        required: true
      },
      isAllChecked: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    methods: {
      finishItem (index) {
        this.todoItems[index].finished = true
      },
      deleteItem (index) {
        this.todoItems.splice(index, 1)
      },
      handleChecked (index) {
        this.todoItems[index].checked = !this.todoItems[index].checked
      }
    },
    watch: {
      isAllChecked: {
        handler: function (newVal) {
          this.todoItems.forEach((element) => {
            if (!element.finished) {
              element.checked = newVal
            }
          }, this)
        }
      }
    }
  }
</script>

<style scoped>

</style>
