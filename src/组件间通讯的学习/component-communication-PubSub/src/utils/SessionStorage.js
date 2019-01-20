export default {
  sessionSave (val) {
    sessionStorage.setItem('name', val)
  },
  sessionRecover () {
    return sessionStorage.getItem('name')
  }
}
