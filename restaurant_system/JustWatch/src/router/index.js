import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'logIn',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login.vue')
    },
    {
      path: '/signup',
      name: 'signUp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/profile.vue')
    },
    {
      path: '/updateprofile',
      name: 'updateprofile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views//UpdateProfile.vue')
    },
    {
      path: '/deletelocation/:locationID',
      name: 'deletelocation',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views//DeleteLocation.vue')
    },
    {
      path: '/update-location/:locationID',
      name: 'update-location',

      component: () => import('../views/UpdateLocation.vue')
    },
    {
      path: '/Menu/:locationID',
      name: 'Menu',

      component: () => import('../views/Menu.vue')
    },
    {
      path: '/category/view/:locationID',
      name: 'ViewCategory',
      component: () => import('../views/ViewOrAddCate.vue')
    },
    {
      path: '/category/add/:locationID',
      name: 'AddCategory',
      component: () => import('../views/AddCate.vue')
    },
    {
      path: '/Update-Category/:locationID',
      name: 'updatecategory',
      component: () => import('../views/UdpateCategory.vue')
    },
    {
      path: '/Delete-Category/:locationID',
      name: 'deleteCate',
      component: () => import('../views/DeleteCategory.vue')
    },
    {
      path: '/Add-Item/:locationID',
      name: 'AddItem',
      component: () => import('../views/Additem.vue')
    },

    {
      path: '/Item/:itemID/update/:locationID',
      name: 'UpdateItem',
      component: () => import('../views/UpdateItem.vue')
    },

    {
      path: '/Item/:itemID/DeleteAll/:locationID',
      name: 'DeleteItem',
      component: () => import('../views/DeleteItem.vue')
    },

    {
      path: '/Item/delete-all/:catID',
      name: 'DelletAllItem',
      component: () => import('../views/DeleteAllItem.vue')
    },

    {
      path: '/:catchAll(.*)',
      name: 'ErrorPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views//ErrorPage.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name.title) {
    document.title = to.name.title
  } else {
    document.title = 'Resturant Management'
  }
  next()
})
export default router
