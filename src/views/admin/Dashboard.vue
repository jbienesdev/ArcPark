<template>
  <div>
    <navbar/>
    <add-modal 
      v-if="addModalVisible"
      :addModalVisible.sync="addModalVisible"
      @close-modal="closeModal"
      :coordinates="coordinates"
    ></add-modal>
    <google-maps
      :addModalVisible.sync="addModalVisible"
      :coordinates.sync="coordinates"
      :isClickable="isClickable"
    ></google-maps>
    <!-- <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" @click="logOutUser">
      Log out
    </button> -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import GoogleMaps from '@/components/GoogleMaps.vue'
import AddModal from '@/components/AddModal.vue'

export default {
  components: {
    Navbar,
    GoogleMaps,
    AddModal
  },
  data() {
    return {
      addModalVisible: false,
      coordinates: {
        lat: 0,
        lng: 0
      },
      isClickable: true
    }
  },
  methods: {
    closeModal() {
      this.addModalVisible = false
    }
  }
}
</script>
