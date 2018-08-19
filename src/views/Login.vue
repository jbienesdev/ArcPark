<template>
  <div>
    <div class="login-design absolute h-screen xsm:hidden md:block"></div>
    <div class="flex">
      <div class="flex-1 xsm:hidden md:block"></div>
      <div class="flex-1 flex justify-center items-center h-screen flex-col">
        <img class="h-48 w-auto" src="@/assets/images/CarLogo.svg" alt="Arcpark Logo">
        <h1 class="font-sans tracking-wide text-3xl font-semibold text-center text-indigo mb-4 uppercase">ArcPark</h1>
        <form class="w-full flex items-center flex-col" @submit.prevent="logInUser">
          <div class="mb-4 xsm:w-3/4 md:w-1/2 ">
            <label for="email" class="font-sans block text-grey-darker text-sm font-bold mb-2">
              Email
            </label>
            <input type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight"  id="email" v-model="email">
          </div>
          <div class="mb-4 xsm:w-3/4 md:w-1/2 ">
            <label for="password" class="font-sans block text-grey-darker text-sm font-bold mb-2">
              Password
            </label>
            <input type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight"  id="password" v-model="password">
          </div>
          <div class="xsm:w-3/4 md:w-1/2 ">
            <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    logInUser() {
      const { email, password } = this
      this.$store.dispatch('LOG_IN_USER', { email, password })
        .then(() => this.$router.push('/admin/dashboard'))
    }
  }
}
</script>


<style lang="scss" scoped>
.login-design {
  background-image: url('../assets/images/LoginDesign.svg');
  background-size: cover;
  background-repeat: no-repeat;
  width: 1080px;
  z-index: -2;
}
</style>
