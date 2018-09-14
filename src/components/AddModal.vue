<template>
  <div class="modal-bg">
    <div class="w-full h-full fixed pin z-10 flex justify-center items-center">
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
        <div class="mb-6">
          
        </div>
        <div class="flex items-center justify-between">
          <button @click="addParkingArea" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Add Parking Area
          </button>
          <a class="cursor-pointer text-red hover:text-red-darker no-underline" @click="$store.commit('TOGGLE_ADDMODAL', false)">Cancel</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areaNumber: ''
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
          this.$store.commit('TOGGLE_ADDMODAL', false)
        })
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Kindly fill up the area number field.'
        })
      }
    }
  },
  computed: {
    getClickedCoordinates() {
      return this.$store.getters['getClickedCoordinates']
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
