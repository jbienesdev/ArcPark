<template>
  <div class="modal-bg">
    <!-- Add Modal -->
    <div v-if="modalType === 'add'" class="w-full h-full fixed pin z-10 flex justify-center items-center">
      <form class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4 md:w-1/3">
        <div class="mb-2 md:mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="area-number">
            Area Number
          </label>
          <input v-model.trim="areaNumber" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="area-number" type="text">
        </div>
        <div class="flex flex-wrap mb-4">
          <!-- Latitude -->
          <div class="w-full md:w-1/2 md:pr-2 mb-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="latitude">
              Latitude
            </label>
            <input readonly v-model="getClickedCoordinates.lat" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="latitude" type="text">
          </div>
          <!-- Longitude -->
          <div class="w-full md:w-1/2 md:pl-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
              Longitude
            </label>
            <input readonly v-model="getClickedCoordinates.lng" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="username" type="text">
          </div>
        </div>
        <div class="mb-6"></div>
        <div class="flex items-center justify-between">
          <button @click="addParkingArea" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Add Parking Area
          </button>
          <a class="cursor-pointer text-red hover:text-red-darker no-underline" @click="$store.commit('MODAL_TYPE', { visible: false })">Cancel</a>
        </div>
      </form>
    </div>

    <!-- Modify Modal -->
    <div v-else-if="modalType === 'modify'" class="w-full h-full fixed pin z-10 flex justify-center items-center">
      <form class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4 md:w-1/3">
        <div class="flex">
          <p v-if="getClickedCoordinates.status === 'available'" class="text-green text-sm font-light w-1/2">&#11044; Available</p>
          <div v-if="getClickedCoordinates.status === 'available'" @click="deleteParkingArea(getClickedCoordinates['.key'])" class="text-red text-sm font-light w-1/2 flex justify-end hover:underline cursor-pointer">
            <i class="fa fa-trash pr-2" aria-hidden="true"></i> Delete Parking Area
          </div>
          <p v-else-if="getClickedCoordinates.status === 'unavailable'" class="text-red-light text-sm font-light">&#11044; Occupied</p>
        </div>
        <div class="my-2 md:mb-4" v-if="getClickedCoordinates.status !== 'unavailable'">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="plate-number">
            Reservation Type
          </label>
          <select v-model="reservationType" class="w-full text-sm text-grey-dark px-3 py-2 border border-grey-light rounded shadow" id="logfilter">
            <option class="mr-3">Non-Reservation</option>
            <option class="mr-3">Reservation</option>
          </select>
        </div>
        <div class="my-2 md:mb-4" v-if="reservationType === 'Non-Reservation'">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="plate-number">
            Plate Number
          </label>
          <input v-if="getClickedCoordinates.status === 'available'" v-model.trim="plateNumber" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="plate-number" type="text">
          <input v-else-if="getClickedCoordinates.status === 'unavailable'" v-model.trim="getClickedCoordinates.plate_number" disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="area-number" type="text">
        </div>
        <div class="my-2 md:mb-4" v-else-if="reservationType === 'Reservation'">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="reserve-for">
            Reservation for
          </label>
          <input v-if="getClickedCoordinates.status === 'available'" v-model.trim="reservedTo" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="reserve-for" type="text">
        </div>
        <div class="mb-2 md:mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="area-number">
            Area Number
          </label>
          <input disabled v-model="getClickedCoordinates['.key']" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="area-number" type="text">
        </div>
        <div class="flex flex-wrap mb-4">
          <!-- Latitude -->
          <div class="w-full md:w-1/2 md:pr-2 mb-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="latitude">
              Latitude
            </label>
            <input disabled v-model="getClickedCoordinates.lat" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="latitude" type="text">
          </div>
          <!-- Longitude -->
          <div class="w-full md:w-1/2 md:pl-2">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
              Longitude
            </label>
            <input disabled v-model="getClickedCoordinates.lng" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="username" type="text">
          </div>
        </div>
        <div class="mb-6"></div>
        <div class="flex items-center justify-between">
          <button v-if="getClickedCoordinates.status === 'available' && reservationType === 'Non-Reservation'" @click="checkInVehicle('non-reservation')" class="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Park Now!
          </button>
          <button v-if="getClickedCoordinates.status === 'available' && reservationType === 'Reservation'" @click="reserveVehicle" class="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Reserve Now!
          </button>
          <button v-if="getClickedCoordinates.status === 'unavailable'" @click="checkOutVehicle" class="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Check Out
          </button>
          <a class="cursor-pointer text-red hover:text-red-darker no-underline" @click="$store.commit('MODAL_TYPE', { visible: false })">Cancel</a>
        </div>
      </form>
    </div>
    
    <!-- Waiting modal -->
    <div v-else-if="modalType === 'waiting'" class="w-full h-full fixed pin z-10 flex justify-center items-center">
      <form class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4 md:w-1/3">
        <p class="text-red text-lg mb-2 font-bold">Warning!</p>
        <p class="text-gray text-sm font-light ">Are you sure you want to change this area back to available? This process can't be undone.</p>
        
        <div class="mb-6"></div>
        <div class="flex items-center justify-between">
          <button @click="cancelWaiting" class="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Do It!
          </button>
          <a class="cursor-pointer text-red hover:text-red-darker no-underline" @click="$store.commit('MODAL_TYPE', { visible: false })">Cancel</a>
        </div>
      </form>
    </div>

    <!-- Reserved modal -->
    <div v-else-if="modalType === 'reserved'" class="w-full h-full fixed pin z-10 flex justify-center items-center">
      <form class="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4 md:w-1/3">
        <p class="text-grey text-sm font-light mb-2">&#11044; Reserved</p>
        <!-- If cancel reservation is enabled -->
        <div class="mb-2" v-if="reserveActionType === 'Cancel Reservation'">
          <p class="text-red text-lg mb-2 font-bold">Warning!</p>
          <p class="text-gray text-sm font-light ">Are you sure you want to change this area back to available? This process can't be undone.</p>
        </div>

        <label class="block text-grey-darker text-sm font-bold mb-2" for="plate-number">
          What do you want to do?
        </label>
        <select v-model="reserveActionType" class=" mb-2 w-full text-sm text-grey-dark px-3 py-2 border border-grey-light rounded shadow" id="logfilter">
          <option class="mr-3">Enter Parking Area</option>
          <option class="mr-3">Cancel Reservation</option>
        </select>

        <!-- If enter parking area is enabled -->
        <div v-if="reserveActionType === 'Enter Parking Area'">
          <div class="my-2 md:mb-4" v-if="reservationType === 'Non-Reservation'">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="plate-number">
              Plate Number
            </label>
            <input v-model.trim="plateNumber" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="plate-number" type="text">
          </div>
          <div class="mb-2 md:mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="area-number">
              Area Number
            </label>
            <input disabled v-model="getClickedCoordinates['.key']" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="area-number" type="text">
          </div>
          <div class="flex flex-wrap mb-4">
            <!-- Latitude -->
            <div class="w-full md:w-1/2 md:pr-2 mb-2">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="latitude">
                Latitude
              </label>
              <input disabled v-model="getClickedCoordinates.lat" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="latitude" type="text">
            </div>
            <!-- Longitude -->
            <div class="w-full md:w-1/2 md:pl-2">
              <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                Longitude
              </label>
              <input disabled v-model="getClickedCoordinates.lng" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="username" type="text">
            </div>
          </div>
        </div>

        <div class="mb-6"></div>
        <div class="flex items-center justify-between">
          <button @click="checkInVehicle('reservation')" v-if="reserveActionType === 'Enter Parking Area'" class="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Park Now!
          </button>
          <button @click="cancelReservation" v-else-if="reserveActionType === 'Cancel Reservation'" class="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Do It!
          </button>
          <a class="cursor-pointer text-red hover:text-red-darker no-underline" @click="$store.commit('MODAL_TYPE', { visible: false })">Cancel</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '@/config/firebase'
import jsPDF from 'jspdf'
import format from 'date-fns/format'
export default {
  data() {
    return {
      areaNumber: '',
      plateNumber: '',
      reservationType: 'Non-Reservation',
      reservedTo: '',
      reserveActionType: 'Enter Parking Area'
    }
  },
  methods: {
    // Adds a parking area
    addParkingArea() {
      let { areaNumber, coordinates } = this
      // If areaNumber is empty
      if(areaNumber) {
        this.$store.dispatch('ADD_PARKING_AREA', {
          areaNumber,
          coordinates: this.getClickedCoordinates
        }).then(() => {
          this.$store.commit('MODAL_TYPE', { visible: false })
        })
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Kindly fill up the area number field.'
        })
      }
    },
    // Vehicle is going in the aprking area
    checkInVehicle(statusFrom) {
      const { lat, lng } = this.getClickedCoordinates
      if(this.plateNumber) {
        //If the status is not reserved
        if(statusFrom === 'non-reservation') {
          db.ref(`parking_area/${this.getClickedCoordinates['.key']}`).set({
            counter: 1,
            plate_number: this.plateNumber,
            status: 'waiting',
            lat,
            lng,
            distance_in_cm: 0
          }).then(() => {
            this.$store.commit('MODAL_TYPE', { visible: false })
            this.$notify({
              type: 'success',
              title: 'Success!',
              text: `${this.plateNumber} can now park to area ${this.getClickedCoordinates['.key']}`
            })

            let doc = new jsPDF({
              orientation: 'landscape',
              unit: 'in',
              format: [2.5, 1.5]
            })
            doc.setFontSize(8)
            doc.setFontType("bold")
            doc.text('ArcPark: Parking Allocation System', 0.3, 0.3)
            doc.setFontType("normal")
            doc.text(`Time: ${ format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'h:mm a') }`, 0.3, 0.4)
            doc.text(`Date: ${ format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'MMM DD, YYYY') }`, 0.3, 0.5)
            doc.text(`Plate Number: ${ this.plateNumber }`, 0.3, 0.6)
            doc.text(`Area Number: `, 0.3, 0.7)
            doc.setFontType("bold")
            doc.setFontSize(24)
            doc.text(`${ this.getClickedCoordinates['.key'] }`, 1.1, 1.2)
            doc.output('dataurlnewwindow')

          })
        } else if(statusFrom === 'reservation') { //If the status is reserved
          db.ref(`parking_area/${this.getClickedCoordinates['.key']}`).set({
            counter: 1,
            plate_number: this.plateNumber,
            reservedTo: this.getClickedCoordinates.reservedTo,
            status: 'waiting',
            lat,
            lng,
            distance_in_cm: 0
          }).then(() => {
            this.$store.commit('MODAL_TYPE', { visible: false })
            this.$notify({
              type: 'success',
              title: 'Success!',
              text: `${this.plateNumber} can now park to area ${this.getClickedCoordinates['.key']}`
            })

            let doc = new jsPDF({
              orientation: 'landscape',
              unit: 'in',
              format: [2.5, 1.5]
            })
            doc.setFontSize(8)
            doc.setFontType("bold")
            doc.text('ArcPark: Parking Allocation System', 0.3, 0.3)
            doc.setFontType("normal")
            doc.text(`Time: ${ format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'h:mm a') }`, 0.3, 0.4)
            doc.text(`Date: ${ format(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }), 'MMM DD, YYYY') }`, 0.3, 0.5)
            doc.text(`Reserved to: ${ this.getClickedCoordinates.reservedTo }`, 0.3, 0.6)
            doc.text(`Plate Number: ${ this.plateNumber }`, 0.3, 0.7)
            doc.text(`Area Number: `, 0.3, 0.8)
            doc.setFontType("bold")
            doc.setFontSize(24)
            doc.text(`${ this.getClickedCoordinates['.key'] }`, 1.1, 1.2)
            doc.output('dataurlnewwindow')
          })
        }
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Kindly fill up the plate number field.'
        })
      }
    },
    reserveVehicle() {
      const { lat, lng } = this.getClickedCoordinates
      if(this.reservedTo) {
        db.ref(`parking_area/${this.getClickedCoordinates['.key']}`).set({
          counter: 1,
          status: 'reserved',
          lat,
          lng,
          distance_in_cm: 0,
          reservedTo: this.reservedTo
        }).then(() => {
          this.$store.commit('MODAL_TYPE', { visible: false })
          this.$notify({
            type: 'success',
            title: 'Success!',
            text: `${this.reservedTo} is now reserved to ${this.getClickedCoordinates['.key']}`
          })
        })
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Kindly fill up the reservation for field.'
        })
      }
    },
    // Vehicle is going out of the parking area
    checkOutVehicle() {
      const { lat, lng } = this.getClickedCoordinates
      db.ref(`parking_area/${this.getClickedCoordinates['.key']}`).set({
        counter: 1,
        status: 'available',
        lat,
        lng
      }).then(() => {
        this.$store.commit('MODAL_TYPE', { visible: false })
        this.$notify({
          type: 'success',
          title: 'Success!',
          text: `${this.plateNumber} is now checked out at area ${this.getClickedCoordinates['.key']}`
        })
      })
    },
    // Cancel waiting status
    cancelWaiting() {
      const { lat, lng } = this.getClickedCoordinates
      db.ref(`parking_area/${this.getClickedCoordinates['.key']}`).set({
        counter: 1,
        status: 'available',
        lat,
        lng,
        distance_in_cm: 0
      }).then(() => {
        this.$store.commit('MODAL_TYPE', { visible: false })
        this.$notify({
          type: 'success',
          title: 'Success!',
          text: `Area ${this.getClickedCoordinates['.key']} is now available.`
        })
      })
    },
    // Cancel reservation
    cancelReservation() {
      // The same as cancel waiting method
      this.cancelWaiting()
    },
    deleteParkingArea(areaNumber) {
      if(confirm('Are you sure you want to delete this area number?')) {
        db.ref(`parking_area/${areaNumber}`).remove().then(() => {
          this.$store.commit('MODAL_TYPE', { visible: false })
          this.$notify({
            type: 'success',
            title: 'Success!',
            text: `Area ${areaNumber} is now deleted.`
          })
        })
      }
    }
  },
  computed: {
    getClickedCoordinates() {
      return this.$store.getters['getClickedCoordinates']
    },
    modalType() {
      return this.$store.getters['getModalType'].type
    }
  }
}
</script>

<style scoped>
@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
.modal-bg::before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, .5);
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 1.5ex;
  background-origin: content-box;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnMiIKICAgdmlld0JveD0iMCAwIDM1Ljk3MDk4MyAyMy4wOTE1MTgiCiAgIGhlaWdodD0iNi41MTY5Mzk2bW0iCiAgIHdpZHRoPSIxMC4xNTE4MTFtbSI+CiAgPGRlZnMKICAgICBpZD0iZGVmczQiIC8+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAyLjAxNDUxLC00MDcuMTIyMjUpIgogICAgIGlkPSJsYXllcjEiPgogICAgPHRleHQKICAgICAgIGlkPSJ0ZXh0MzMzNiIKICAgICAgIHk9IjYyOS41MDUwNyIKICAgICAgIHg9IjI5MS40Mjg1NiIKICAgICAgIHN0eWxlPSJmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zaXplOjQwcHg7bGluZS1oZWlnaHQ6MTI1JTtmb250LWZhbWlseTpzYW5zLXNlcmlmO2xldHRlci1zcGFjaW5nOjBweDt3b3JkLXNwYWNpbmc6MHB4O2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MXB4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICB4bWw6c3BhY2U9InByZXNlcnZlIj48dHNwYW4KICAgICAgICAgeT0iNjI5LjUwNTA3IgogICAgICAgICB4PSIyOTEuNDI4NTYiCiAgICAgICAgIGlkPSJ0c3BhbjMzMzgiPjwvdHNwYW4+PC90ZXh0PgogICAgPGcKICAgICAgIGlkPSJ0ZXh0MzM0MCIKICAgICAgIHN0eWxlPSJmb250LXN0eWxlOm5vcm1hbDtmb250LXZhcmlhbnQ6bm9ybWFsO2ZvbnQtd2VpZ2h0Om5vcm1hbDtmb250LXN0cmV0Y2g6bm9ybWFsO2ZvbnQtc2l6ZTo0MHB4O2xpbmUtaGVpZ2h0OjEyNSU7Zm9udC1mYW1pbHk6Rm9udEF3ZXNvbWU7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjpGb250QXdlc29tZTtsZXR0ZXItc3BhY2luZzowcHg7d29yZC1zcGFjaW5nOjBweDtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIj4KICAgICAgPHBhdGgKICAgICAgICAgaWQ9InBhdGgzMzQ1IgogICAgICAgICBzdHlsZT0iZmlsbDojMzMzMzMzO2ZpbGwtb3BhY2l0eToxIgogICAgICAgICBkPSJtIDIzNy41NjY5Niw0MTMuMjU1MDcgYyAwLjU1ODA0LC0wLjU1ODA0IDAuNTU4MDQsLTEuNDczMjIgMCwtMi4wMzEyNSBsIC0zLjcwNTM1LC0zLjY4MzA0IGMgLTAuNTU4MDQsLTAuNTU4MDQgLTEuNDUwOSwtMC41NTgwNCAtMi4wMDg5MywwIEwgMjIwLDQxOS4zOTM0NiAyMDguMTQ3MzIsNDA3LjU0MDc4IGMgLTAuNTU4MDMsLTAuNTU4MDQgLTEuNDUwODksLTAuNTU4MDQgLTIuMDA4OTMsMCBsIC0zLjcwNTM1LDMuNjgzMDQgYyAtMC41NTgwNCwwLjU1ODAzIC0wLjU1ODA0LDEuNDczMjEgMCwyLjAzMTI1IGwgMTYuNTYyNSwxNi41NDAxNyBjIDAuNTU4MDMsMC41NTgwNCAxLjQ1MDg5LDAuNTU4MDQgMi4wMDg5MiwwIGwgMTYuNTYyNSwtMTYuNTQwMTcgeiIgLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=");
}
</style>
