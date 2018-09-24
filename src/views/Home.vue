<template>
  <div class="home">
    <navbar></navbar>
    <google-maps
      :isClickable="isClickable"
    ></google-maps>

    <div class="p-4 fixed legend bg-white rounded shadow">
      <h1 class="text-sm text-grey-darker mb-2">Map Legend</h1>
      <div class="flex flex-col text-sm text-grey-darkest">
        <div class=" text-green">&#11044; Available</div>
        <div class=" text-grey-dark">&#11044; Reserved</div>
        <div class=" text-yellow">&#11044; Waiting</div>
        <div class=" text-red-light">&#11044; Occupied</div>
      </div>
    </div>

    <!-- Chatbot modal -->
    <div v-if="chatBoxModal" class="bg-modal flex justify-center items-center">
      <i @click="chatBoxModal = false" class="fa fa-times hover:bg-grey rounded-full text-white fixed close-btn px-2 py-2 cursor-pointer" aria-hidden="true"></i>
      <iframe
        allow="microphone;"
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/parko">
      </iframe>
    </div>
    <button @click="chatBoxModal = true" class="bg-blue hover:bg-blue-dark text-white font-bold px-4 py-3 fixed rounded-full chat-button">
      <i class="fa fa-microphone" aria-hidden="true"></i> Talk to Parko
    </button>
    

  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from '@/components/GoogleMaps.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'home',
  components: {
    GoogleMaps,
    Navbar
  },
  data() {
    return {
      isClickable: false,
      chatBoxModal: false
    }
  }
}
</script>

<style scoped>
@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
.chat-button {
  right: 20px;
  bottom: 20px;
}
.bg-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, .5);
}
.close-btn {
  top: 20px;
  left: 20px;
  z-index: 100;
}
.legend {
  top: 110px;
  left: 10px;
}
</style>
