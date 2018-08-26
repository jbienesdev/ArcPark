import store from '../store'

export default (from, to, next) => {
  !store.getters.getUserData ? next('/') : next()
}