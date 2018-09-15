<template>
  <div>
    <!-- Using a conditional event handler (isClickable prop) -->
    <GmapMap
      :center="{lat:6.912826, lng:122.060384}"
      :zoom="21"
      style="width: 100%; height: 600px"
      :options="mapConfig"
      v-on="isClickable ? { click: onMapClick } : {}"
    >
      <GmapMarker
        v-for="parkingArea in parkingAreas"
        :key="parkingArea['.key']"
        :position="{ lat: parseFloat(parkingArea.lat), lng: parseFloat(parkingArea.lng) }"
        :icon="parkingAreaStatus(parkingArea.status)"
        @click="onMarkerClick(parkingArea)"
      />
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
      }
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

      if(parkingArea.status === 'available' || parkingArea.status === 'unavailable') {
        this.$store.commit('MODAL_TYPE', {
          type: 'modify',
          visible: true
        })
      } else if(parkingArea.status === 'waiting') {
        this.$store.commit('MODAL_TYPE', {
          type: 'waiting',
          visible: true
        })
      }
    },
    parkingAreaStatus(status) {
      if (status === 'available')
        return 'https://firebasestorage.googleapis.com/v0/b/arcpark-1532921739973.appspot.com/o/PulsatingGreen.svg?alt=media&token=fc953a99-97bb-4348-a4e1-ef4051ae2f50'
      else if (status === 'waiting')
        return 'https://firebasestorage.googleapis.com/v0/b/arcpark-1532921739973.appspot.com/o/PulsatingYellow.svg?alt=media&token=1460c775-3f9f-47f8-82cb-7453d27614dc'
      else if (status === 'unavailable')
        return 'https://firebasestorage.googleapis.com/v0/b/arcpark-1532921739973.appspot.com/o/PulsatingRed.svg?alt=media&token=4b8d31b1-7edc-4ca8-b693-5757ada21246'
    }
  },
  computed: {
    parkingAreas() {
      return this.$store.getters['getParkingAreas']
    }
  }
}
</script>
