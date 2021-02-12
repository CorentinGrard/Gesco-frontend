import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify';
import router from '@/router'
import store from '@/store'
import updateToken from '@/middlewares/update-token';
// eslint-disable-next-line 
import keycloak from '@/plugins/keycloak'

Vue.config.productionTip = false

Vue.$keycloak
  .init({
    onLoad: 'login-required',
  })
  .then((authenticated) => {
    console.log(`Authentification : ${authenticated}`)
    store.dispatch("user/fetch")
    new Vue({
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')

    window.onfocus = () => {
      updateToken();
    };
  });