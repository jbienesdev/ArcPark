<template>
  <div>
    <navbar/>
    <map-modal 
      v-if="getModalType && getModalType.visible"
    ></map-modal>
    <google-maps
      :isClickable="isClickable"
    ></google-maps>
    <check-out></check-out>
    <!-- <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" @click="logOutUser">
      Log out
    </button> -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import GoogleMaps from '@/components/GoogleMaps.vue'
import MapModal from '@/components/MapModal.vue'
import CheckOut from '@/components/CheckOutInput.vue'

export default {
  components: {
    Navbar,
    GoogleMaps,
    MapModal,
    CheckOut
  },
  data() {
    return {
      isClickable: true
    }
  },
  computed: {
    getModalType() {
      return this.$store.getters['getModalType']
    }
  }
}
</script>
