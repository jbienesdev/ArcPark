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
        <p v-if="getClickedCoordinates.status === 'available'" class="text-green text-sm font-light">&#11044; Available</p>
        <p v-else-if="getClickedCoordinates.status === 'unavailable'" class="text-red-light text-sm font-light">&#11044; Occupied</p>
        <div class="my-2 md:mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="plate-number">
            Plate Number
          </label>
          <input v-if="getClickedCoordinates.status === 'available'" v-model.trim="plateNumber" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="plate-number" type="text">
          <input v-else-if="getClickedCoordinates.status === 'unavailable'" v-model.trim="getClickedCoordinates.plate_number" disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="area-number" type="text">
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
          <button v-if="getClickedCoordinates.status === 'available'" @click="checkInVehicle" class="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Park Now!
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
  </div>
</template>

<script>
import { db } from '@/config/firebase'
export default {
  data() {
    return {
      areaNumber: '',
      plateNumber: ''
    }
  },
  methods: {
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
    checkInVehicle() {
      const { lat, lng } = this.getClickedCoordinates
      if(this.plateNumber) {
        db.ref(`parking_area/${this.getClickedCoordinates['.key']}`).set({
          counter: 1,
          plate_number: this.plateNumber,
          status: 'waiting',
          lat,
          lng
        }).then(() => {
          this.$store.commit('MODAL_TYPE', { visible: false })
          this.$notify({
            type: 'success',
            title: 'Success!',
            text: `${this.plateNumber} can now park to area ${this.getClickedCoordinates['.key']}`
          })
        })
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Kindly fill up the plate number field.'
        })
      }
    },
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
    cancelWaiting() {
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
          text: `Area ${this.getClickedCoordinates['.key']} is now available.`
        })
      })
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
</style>
