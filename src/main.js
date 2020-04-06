import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import'../src/mixins/generalMixins'

Vue.config.productionTip = false

// Mixins
Vue.mixin({
  methods: {
      userId: () => {
          return JSON.parse(localStorage.getItem('user')).id;
      },
      userEmail: () => {
          return JSON.parse(localStorage.getItem('user')).email;
      }
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

