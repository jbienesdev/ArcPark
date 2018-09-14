<template>
  <div>
    <navbar/>
    <add-modal 
      v-if="addModalVisible"
    ></add-modal>
    <google-maps
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
      isClickable: true
    }
  },
  methods: {
    closeModal() {
      this.addModalVisible = false
    }
  },
  computed: {
    addModalVisible() {
      return this.$store.getters['getAddModalState']
    }
  }
}
</script>
