import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

import router from './router/index'
import store from './store/index'

import '@/assets/css/tailwind.css'
import '@/config/google-maps'
import '@/config/vuefire'
import '@/config/firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      user ? store.commit('AUTH_CHANGE', true) : store.commit('AUTH_CHANGE', false)
    })
  }
}).$mount('#app')
