<template>
  <div>
    <navbar/>
    <logs-table :logs="logs"/>
  </div>
</template>

<script>
import { db } from '@/config/firebase'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import Navbar from '@/components/Navbar.vue'
import LogsTable from '@/components/LogsCard.vue'
export default {
  components: {
    Navbar,
    LogsTable
  },
  data() {
    return {
      logs: []
    }
  },
  created() {
    db.ref('logs').on('value', snapshot => {
      let logsArr = []
      snapshot.forEach(childSnap => {
        logsArr.push({
          '.key': childSnap.key,
          distanceInWordsToNow: distanceInWordsToNow(childSnap.val().timestamp),
          ...childSnap.val()
        })
      })
      this.logs = logsArr.reverse()
    })
  }
}
</script>
