import Vue from 'vue'
import App from './App.vue'

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

//Patron event bus
Vue.prototype.$event = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
