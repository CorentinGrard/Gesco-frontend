import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import config from './config'
import store from './store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  config,
  render: h => h(App)
}).$mount('#app').use(vuetify);