<template>
  <div class="mt-5 container logs">
    <div 
      v-for="log in logs" 
      :key="log['.key']" 
      :class="{ 
        'border-green': log.status === 'available', 
        'border-yellow': log.status === 'waiting', 
        'border-red-light': log.status === 'unavailable' 
      }" 
      class=" shadow hover:shadow-lg px-5 py-4 mb-5 rounded-lg flex border border-t-0 border-r-0 border-b-0 border-l-4" >
      <div class="flex-auto self-center">
        <p class="text-indigo-darker font-semibold">{{ log.message }}</p>
      </div>
      <div class="flex-no-grow text-center text-xs text-grey-dark">
        <p>{{ log.time }}</p>
        <p>{{ log.date }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['logs']
}
</script>

<style scoped>
.logs {
  height: 85vh;
  overflow-y: scroll;
}
</style>

