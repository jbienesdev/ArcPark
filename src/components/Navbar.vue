<template>
  <div class="nav shadow-md flex justify-between items-center px-8">
    <p class="font-bold uppercase text-blue tracking-wide">ArcPark</p>
    <div class="flex justify-center items-center">
      <a class="px-8 text-sm">Logs</a>
      <div class="flex items-center flex-col">
        <p class="text-sm">test@test.com</p>
        <a href="" class="text-sm text-red-light" @click="logOutUser">Logout</a>
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
}
</style>

