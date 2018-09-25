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
  MODAL_TYPE: (state, payload) => {
    state.modalType = payload
  },
  // gets the coordinate that was clicked in the map
  SET_CLICKED_COORDINATES: (state, payload) => {
    state.clickedCoordinates = payload
  },
  CHANGE_STATUS_FILTER: (state, payload) => {
    state.statusFilter = payload
  },
  CHANGE_DATE_FILTER: (state, payload) => {
    state.dateFilter = payload
  }
}