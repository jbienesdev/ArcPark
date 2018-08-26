<template>
  <div>
    <add-modal 
      v-if="addModalVisible"
      @close-modal="closeModal"
      :coordinates="coordinates"
    ></add-modal>
    <GmapMap
      :center="{lat:6.912826, lng:122.060384}"
      :zoom="21"
      style="width: 1000px; height: 600px"
      :options="mapConfig"
      @click="onMapClick"
    >
      <GmapMarker
        v-for="parkingArea in parkingAreas"
        :key="parkingArea['.key']"
        :position="{lat:parkingArea.lat, lng:parkingArea.lng}"
        :icon="parkingArea.status === 'available' 
          ? 'https://firebasestorage.googleapis.com/v0/b/nuxt-blog-536a8.appspot.com/o/PulsatingGreen.svg?alt=media&token=2ef3019f-4524-4601-9b69-8ba78a011854' 
          : 'https://firebasestorage.googleapis.com/v0/b/nuxt-blog-536a8.appspot.com/o/PulsatingRed.svg?alt=media&token=cc9210d5-d822-4835-923a-c93f84c64956'"
      />
    </GmapMap>
  </div>
</template>

<script>
import { mapLayout } from '@/config/mapStyle.js'
import { db } from '@/config/firebase'
import AddModal from './AddModal.vue'

export default {
  components: {
    AddModal
  },
  firestore() {
    return {
      parkingAreas: db.collection('parking_area')
    }
  },
  data() {
    return {
      mapConfig: {
        styles: mapLayout,
        minZoom: 20,
        maxZoom: 22
      },
      coordinates: {
        lat: 0,
        lng: 0
      },
      addModalVisible: false
    }
  },
  methods: {
    onMapClick(e) {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      // Save coordinates to our data in order to pass it into the modal.
      this.coordinates = { lat, lng }
      this.addModalVisible = true
    },
    closeModal() {
      this.addModalVisible = false
    }
  }
}
</script>
