import Vue from 'vue/dist/vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import * as VueGoogleMaps from "vue2-google-maps"
import { iconsSet as icons } from './assets/icons/icons.js'
import WebCam from "vue-web-cam"

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(WebCam)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCeHMXKmBiUwyELyfCIItFpcyFneQgBHxI',
    libraries: 'places', 
  },
})

new Vue({
  el: '#app',
  router,
  icons,
  template: '<App/>',
  components: {
    App
  },
})
