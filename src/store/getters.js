export default {
  getUserData: state => state.user,
  getParkingAreas: state => state.parkingAreas,
  getModalType: state => state.modalType,
  getClickedCoordinates: state => state.clickedCoordinates,
  getStatusFilter: state => state.statusFilter,
  getDateFilter: state => state.dateFilter
}