import store from '../store'

export default (from, to, next) => {
  console.log(store)
  store.getters.getUserData ? next('/admin/dashboard') : next()
}