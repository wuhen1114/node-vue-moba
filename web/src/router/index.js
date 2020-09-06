import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/main.vue'
import More from '../views/more.vue'
import NewsDetail from '../views/NewsDetail.vue'
import Hero from '../views/Hero.vue'

Vue.use(VueRouter)

  const routes = [ 
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/newsDetail/:id',
        name: 'NewsDetail',
        component: NewsDetail,
        props: true
      },
    ]
  },
  {
    path: '/hero/:id',
    name: 'Hero',
    component: Hero,
    props: true
  },
  {
    path: '/more',
    name: 'more',
    component: More
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
