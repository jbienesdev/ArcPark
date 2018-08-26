<template>
  <div>
    <google-maps></google-maps>
    <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" @click="logOutUser">
      Log out
    </button>
  </div>
</template>

<script>
import GoogleMaps from '@/components/GoogleMaps.vue'

export default {
  components: {
    GoogleMaps
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
