import firebase from 'firebase'

export default {
  LOG_IN_USER: ({ commit }, payload) => {
    return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const { uid, email } = user.user
        commit('SET_USER', { uid, email })
      })
  },
  LOG_OUT_USER: ({ commit }) => {
    return firebase.auth().signOut()
      .then(() => {
        commit('AUTH_CHANGE', false)
        commit('SET_USER', null)
      })
  }
}