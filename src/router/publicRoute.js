import store from '../store'

export default (from, to, next) => {
  store.getters.getUserData ? next('/admin/dashboard') : next()
}