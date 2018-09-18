<template>
  <div class="nav shadow-md flex justify-between items-center px-8 bg-indigo">
    <router-link to="/admin/dashboard" class="font-bold uppercase text-white tracking-wide hover:underline no-underline">ArcPark</router-link>
    <div class="flex justify-center items-center">
      <router-link class="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 mx-4 rounded no-underline text-xs" to="/admin/logs">Logs</router-link>
      <div class="flex items-center flex-col">
        <!-- <p class="text-xs text-white">test@test.com</p> -->
        <a class="bg-red-light hover:bg-red text-white font-bold py-2 px-4 rounded no-underline cursor-pointer text-xs" @click="logOutUser">Logout</a>
      </div>
      <!-- <ul class="absolute">
        <li>a</li>
        <li>b</li>
        <li>c</li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
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

<style scoped>
.nav {
  height: 50px;
  position: relative;
  z-index: 99;
}
</style>

