<template>
  <div>
    <navbar/>
    <log-filter></log-filter>
    <logs-table :logs="logFilterData"/>
  </div>
</template>

<script>
import { db } from '@/config/firebase'
import format from 'date-fns/format'
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
    this.$store.commit('CHANGE_STATUS_FILTER', 'All')
    this.$store.commit('CHANGE_DATE_FILTER', 'All')
  },
  computed: {
    logFilterData() {
      let allDates = this.$store.getters['getDateFilter'] === 'All' ? true : false
      let allStatus = this.$store.getters['getStatusFilter'] === 'All' ? true : false

      if(allDates && allStatus)
        return this.logs
      else {
        if(allDates) {
          return this.logs.filter(val => {
            return val.status === this.$store.getters['getStatusFilter'].toLowerCase()
          })
        }

        if(allStatus) {
          return this.logs.filter(val => {
            return val.date === this.$store.getters['getDateFilter']
          })
        }

        return this.logs.filter(val => {
          return val.date === this.$store.getters['getDateFilter'] && val.status === this.$store.getters['getStatusFilter'].toLowerCase()
        })
      }
    }   
  }
}
</script>