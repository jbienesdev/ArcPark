<template>
  <div>
    <google-maps></google-maps>
    {{ messages }}
  </div>
</template>

<script>
import GoogleMaps from '@/components/GoogleMaps.vue'
import { db } from '@/config/firebase'

export default {
  components: {
    GoogleMaps
  },
  firestore() {
    return {
      messages: db.collection('messages')
    }
  }
}
</script>
