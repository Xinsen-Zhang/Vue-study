export default {
  saveTodos: function (todoItems) {
    let index = []
    todoItems.forEach((element) => {
      const id = element['id']
      const name = element['name']
      const checked = element['checked']
      const finished = element['finished']
      let temp = {
        [id]: {
          name,
          checked,
          finished
        }
      }
      window.localStorage.setItem(JSON.stringify(id), JSON.stringify(temp[id]))
      index.unshift(id)
    })
    window.localStorage.setItem('index', JSON.stringify(index))
  },
  readTodos: function () {
    const index = JSON.parse(localStorage.getItem('index'))
    if (!index) {
      return []
    }
    let todoItems = []
    index.forEach((element) => {
      const id = element
      const temp = JSON.parse(localStorage.getItem(JSON.stringify(id)))
      let container = {}
      container.id = id
      for (const key in temp) {
        container[key] = temp[key]
      }
      todoItems.unshift(container)
    })
    return todoItems
  }
}
