import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import'../src/mixins/generalMixins'

Vue.config.productionTip = false

const eventHub = new Vue() // Single event hub

// Mixins
Vue.mixin({  
  data: function () {
    return {
        eventHub: eventHub
    }
},
  methods: {
      userId: () => {        
          return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '';
      },
      userEmail: () => {
          return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : '';
      }
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

