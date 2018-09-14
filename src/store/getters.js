export default {
  getUserData: state => state.user,
  getParkingAreas: state => state.parkingAreas,
  getAddModalState: state => state.addModalVisible,
  getClickedCoordinates: state => state.clickedCoordinates
}