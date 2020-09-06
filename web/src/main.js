import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/iconfont/iconfont.css'
import './style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
// import 'swiper/css/swiper.css'
// If you use Swiper 6.0.0 or higher
import 'swiper/swiper-bundle.css'


Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import Card from './components/Card.vue'
Vue.component('m-card', Card)

import CardList from './components/CardList.vue'
Vue.component('m-card-list', CardList)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: proecss.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
