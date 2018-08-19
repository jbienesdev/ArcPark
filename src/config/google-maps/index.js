import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvKkNZM33_TfZjC3xWfYimSpjWY9z6Cug',
    libraries: 'places'
  }
})