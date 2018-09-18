<template>
  <div>
    <navbar/>
    <log-filter></log-filter>
    <logs-table :logs="logFilterData"/>
  </div>
</template>

<script>
import { db } from '@/config/firebase'
import Navbar from '@/components/Navbar.vue'
import LogsTable from '@/components/LogsCard.vue'
import LogFilter from '@/components/LogFilter.vue'
export default {
  components: {
    Navbar,
    LogsTable,
    LogFilter
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
      this.logs = logsArr.reverse()
    })
    // To refresh the store on route change
    this.$store.commit('CHANGE_LOG_FILTER', 'All')
  },
  computed: {
    logFilterData() {
      switch(this.$store.getters['getLogFilter']){
        case 'All':
          return this.logs
        case 'Available':
          return this.logs.filter(item => item.status === 'available')
        case 'Waiting':
          return this.logs.filter(item => item.status === 'waiting')
        case 'Unavailable':
          return this.logs.filter(item => item.status === 'unavailable')
      }
    }
  }
}
</script>

