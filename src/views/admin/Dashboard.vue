<template>
  <div>
    <google-maps></google-maps>
    <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" @click="logOutUser">
      Log out
    </button>
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
  },
  methods: {
    logOutUser() {
      this.$store.dispatch('LOG_OUT_USER')
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
