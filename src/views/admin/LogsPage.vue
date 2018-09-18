<template>
  <div>
    <navbar/>
    <div class="flex">
      <multiselect
        v-model="selected"
        :options="options"
        class="w-1/3"
      ></multiselect>
    </div>
    <logs-table :logs="logs"/>
  </div>
</template>

<script>
import { db } from '@/config/firebase'
import Navbar from '@/components/Navbar.vue'
import LogsTable from '@/components/LogsCard.vue'
export default {
  components: {
    Navbar,
    LogsTable
  },
  data() {
    return {
      logs: [],
    }
  },
  created() {
    db.ref('logs').on('value', snapshot => {
      let logsArr = []
      snapshot.forEach(childSnap => {
        logsArr.push({
          '.key': childSnap.key,
          ...childSnap.val()
        })
      })
      console.log()
      this.logs = logsArr.reverse()
    })
  }
}
</script>

