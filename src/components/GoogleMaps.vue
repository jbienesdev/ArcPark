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
        :icon="parkingArea.status === 'available' 
          ? 'https://firebasestorage.googleapis.com/v0/b/nuxt-blog-536a8.appspot.com/o/PulsatingGreen.svg?alt=media&token=2ef3019f-4524-4601-9b69-8ba78a011854' 
          : 'https://firebasestorage.googleapis.com/v0/b/nuxt-blog-536a8.appspot.com/o/PulsatingRed.svg?alt=media&token=cc9210d5-d822-4835-923a-c93f84c64956'"
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
      this.$store.commit('SET_CLICKED_COORDINATES', parkingArea)
      this.$store.commit('MODAL_TYPE', {
        type: 'modify',
        visible: true
      })
    }
  },
  computed: {
    parkingAreas() {
      return this.$store.getters['getParkingAreas']
    }
  }
}
</script>
