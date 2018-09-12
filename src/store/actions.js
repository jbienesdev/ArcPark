import firebase from 'firebase'
import { db } from '@/config/firebase'

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
  },
  ADD_PARKING_AREA: ({ commit }, { 
    areaNumber,
    coordinates
  }) => {
    if(areaNumber)
      return db.ref(`parking_area/${areaNumber}`).set({
        lat: coordinates.lat,
        lng: coordinates.lng,
        status: 'available'
      })
  }
}