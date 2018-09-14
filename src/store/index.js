import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,
    parkingAreas: [],
    addModalVisible: false,
    clickedCoordinates: null
  },
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()]
})
