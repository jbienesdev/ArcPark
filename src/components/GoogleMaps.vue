<template>
  <div>
    <!-- Using a conditional event handler (isClickable prop) -->
    <GmapMap
      :center="{lat:6.912826, lng:122.060384}"
      :zoom="21"
      style="width: 100%; height: 500px"
      :options="mapConfig"
      v-on="isClickable ? { click: onMapClick } : {}"
    >
      <GmapMarker
        v-for="parkingArea in parkingAreas"
        :key="parkingArea['.key']"
        :position="{ lat: parseFloat(parkingArea.lat), lng: parseFloat(parkingArea.lng) }"
        :icon="parkingAreaStatus(parkingArea.status)"
        @click="onMarkerClick(parkingArea)"
        @mouseover="mouseOverEvent(parkingArea)"
        @mouseout="statusText = null"
      />
      <div slot="visible">
        <div 
          v-if="statusText"
          :class="{ 
            'bg-green': parkingAreaStatusText === 'available', 
            'bg-yellow-darker': parkingAreaStatusText === 'waiting',
            'bg-grey-darker': parkingAreaStatusText === 'reserved',
            'bg-red-dark': parkingAreaStatusText === 'occupied'
          }"
          class="info-marker px-4 py-2 rounded">
          <p>{{ statusText }}</p>
        </div>
      </div>
    </GmapMap>
  </div>
</template>

<script>
import { mapLayout } from '@/config/mapStyle.js'

export default {
  props: {
    isClickable: Boolean
  },
  data() {
    return {
      mapConfig: {
        styles: mapLayout,
        minZoom: 20,
        maxZoom: 22
      },
      statusText: '',
      parkingAreaStatusText: ''
    }
  },
  created() {
    this.$store.dispatch('FETCH_PARKING_AREAS')
  },
  methods: {
    onMapClick(e) {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      // Pass data to parent Dashboard component
      this.$store.commit('SET_CLICKED_COORDINATES', { lat, lng })
      this.$store.commit('MODAL_TYPE', {
        type: 'add',
        visible: true
      })
    },
    onMarkerClick(parkingArea) {
      // Save parkingArea details to vuex store upon click.
      this.$store.commit('SET_CLICKED_COORDINATES', parkingArea)
      if(parkingArea.status === 'available' || parkingArea.status === 'occupied') {
        this.$store.commit('MODAL_TYPE', {
          type: 'modify',
          visible: true
        })
      } else if(parkingArea.status === 'waiting') {
        this.$store.commit('MODAL_TYPE', {
          type: 'waiting',
          visible: true
        })
      } else if(parkingArea.status === 'reserved') {
        this.$store.commit('MODAL_TYPE', {
          type: 'reserved',
          visible: true
        })
      }
    },
    parkingAreaStatus(status) {
      if (status === 'available')
        return 'https://firebasestorage.googleapis.com/v0/b/arcpark-1532921739973.appspot.com/o/PulsatingGreen.svg?alt=media&token=fc953a99-97bb-4348-a4e1-ef4051ae2f50'
      else if (status === 'reserved')
        return 'https://firebasestorage.googleapis.com/v0/b/arcpark-1532921739973.appspot.com/o/PulsatingGray.svg?alt=media&token=d1b74198-24fc-429b-94e2-798a63cfc931'
      else if (status === 'waiting')
        return 'https://firebasestorage.googleapis.com/v0/b/arcpark-1532921739973.appspot.com/o/PulsatingYellow.svg?alt=media&token=1460c775-3f9f-47f8-82cb-7453d27614dc'
      else if (status === 'occupied')
        return 'https://firebasestorage.googleapis.com/v0/b/arcpark-1532921739973.appspot.com/o/PulsatingRed.svg?alt=media&token=4b8d31b1-7edc-4ca8-b693-5757ada21246'
    },
    mouseOverEvent(parkingArea) {
      this.parkingAreaStatusText = parkingArea.status

      // In order to be appealing in the info window.
      let currentStatusText = 
      ` Area Number: ${ parkingArea['.key'] }
        Status: ${ parkingArea.status }`
      if(parkingArea.reservedTo) {
        currentStatusText += `
        ${ parkingArea.reservedTo ? `Reserved to: ${ parkingArea.reservedTo }` : '' }`
      }
      if(parkingArea.plate_number) {
        currentStatusText += `
        ${ parkingArea.plate_number ? `Plate Number: ${ parkingArea.plate_number }` : '' }`
      }
      if(parkingArea.vehicle_type) {
        currentStatusText += `
        ${ parkingArea.vehicle_type ? `Vehicle Type: ${ parkingArea.vehicle_type }` : '' }`
      }
      this.statusText = currentStatusText
    }
  },
  computed: {
    parkingAreas() {
      return this.$store.getters['getParkingAreas']
    }
  }
}
</script>

<style scoped>
.info-marker {
  bottom: 10%; 
  left: 10px; 
  color: white; 
  position: absolute; 
  z-index: 100;
  white-space: pre-line;
}
</style>
