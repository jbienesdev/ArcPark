<template>
  <GmapMap
    :center="{lat:6.912826, lng:122.060384}"
    :zoom="21"
    :minZoom="18"
    :maxZoom="21"
    style="width: 1000px; height: 600px"
    :options="mapConfig"
  >
    <GmapMarker
      :position="{lat:6.912826, lng:122.060384}"
      :icon="'https://firebasestorage.googleapis.com/v0/b/nuxt-blog-536a8.appspot.com/o/PulsatingGreen.svg?alt=media&token=2ef3019f-4524-4601-9b69-8ba78a011854'"
    />
    <GmapMarker
      :position="{lat:6.912801, lng:122.060410}"
      :icon="'https://firebasestorage.googleapis.com/v0/b/nuxt-blog-536a8.appspot.com/o/PulsatingRed.svg?alt=media&token=cc9210d5-d822-4835-923a-c93f84c64956'"
    />
  </GmapMap>
</template>

<script>
import { mapLayout } from '@/config/mapStyle.js'
export default {
  data() {
    return {
      mapConfig: {
        styles: mapLayout,
        minZoom: 20,
        maxZoom: 22
      }
    }
  }
}
</script>
