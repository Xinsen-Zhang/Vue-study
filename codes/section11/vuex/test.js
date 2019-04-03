{
  asnycIncrement (context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('increment')
        resolve()
      }, 1000)
    })
  }
}
