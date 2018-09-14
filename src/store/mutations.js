export default {
  AUTH_CHANGE: (state, payload) => {
    state.isLoggedIn = payload
  },
  SET_USER: (state, payload) => {
    state.user = payload
  },
  SET_PARKING_AREAS: (state, payload) => {
    state.parkingAreas = payload
  },
  TOGGLE_ADDMODAL: (state, payload) => {
    state.addModalVisible = payload
  },
  // gets the coordinate that was clicked in the map
  SET_CLICKED_COORDINATES: (state, payload) => {
    state.clickedCoordinates = payload
  }
}