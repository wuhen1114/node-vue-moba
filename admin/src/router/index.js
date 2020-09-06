import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/main.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemsEdit from '../views/ItemsEdit.vue'
import ItemsList from '../views/ItemsList.vue'

import HerosEdit from '../views/HerosEdit.vue'
import HerosList from '../views/HerosList.vue'

import ArticlesEdit from '../views/ArticlesEdit.vue'
import ArticlesList from '../views/ArticlesList.vue'

import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {isPublic: true}
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/edit', component: CategoryEdit },
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },
        { path: '/categories/list', component: CategoryList },
  
        { path: '/items/edit', component: ItemsEdit },
        { path: '/items/edit/:id', component: ItemsEdit, props: true },
        { path: '/items/list', component: ItemsList },
  
        { path: '/heros/edit', component: HerosEdit },
        { path: '/heros/edit/:id', component: HerosEdit, props: true },
        { path: '/heros/list', component: HerosList },
  
        { path: '/articles/edit', component: ArticlesEdit },
        { path: '/articles/edit/:id', component: ArticlesEdit, props: true },
        { path: '/articles/list', component: ArticlesList },
  
        { path: '/ads/edit', component: AdsEdit },
        { path: '/ads/edit/:id', component: AdsEdit, props: true },
        { path: '/ads/list', component: AdsList },
  
        { path: '/admin_user/edit', component: AdminUserEdit },
        { path: '/admin_user/edit/:id', component: AdminUserEdit, props: true },
        { path: '/admin_user/list', component: AdminUserList },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router
