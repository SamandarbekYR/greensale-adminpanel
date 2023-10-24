import { createRouter, createWebHistory } from 'vue-router'
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../layouts/Layout.vue"),
      redirect:"/auth/login",
      children :[
        {
           path: 'categories',
           component: ()=> import("../views/Categories/CategoryView.vue")
        },
        {
          path: 'dashboard',
          component: ()=> import("../views/Dashboard/DashboardView.vue")
          // meta: { requiresAuth: true }
       },
       {
          path:'admins',
          component: () => import("../views/Admins/AdminView.vue")
          // meta: { requiresAuth: true }
       },
       {
        path:'users',
        component: () => import("../views/Users/UserView.vue")
        // meta: { requiresAuth: true }
       }, 
       {
        path : 'info',
        component : () => import("../views/Info/InfoView.vue")
        // meta: { requiresAuth: true }
       },
       {
        path : 'sellers',
        component: () => import("../views/Sellers/SellerView.vue")
        // meta: { requiresAuth: true }
       },
       {
        path : 'buyers',
        component: () => import("../views/Buyers/BuyerView.vue")
        // meta: { requiresAuth: true }
       },
       {
        path : 'storages',
        component: () => import("../views/Storages/StorageView.vue")
        // meta: { requiresAuth: true }
       },
       {
        path:'sellerinformation',
        component:()=> import ("../views/Sellers/SellerGetByIdView.vue"),
        props:true
       // meta: { requiresAuth: true }
      },
      
       {
        path:'buyerinformation',
        component:()=> import ("../views/Buyers/BuyerGetByIdView.vue")
       // meta: { requiresAuth: true }
      },
      {
        path:'storageinformation',
        component:()=> import ("../views/Storages/StorageByIdView.vue")
       // meta: { requiresAuth: true }
      }
      ],
    },
    { 
      path:"/auth/login",
      component: ()=> import ("../views/Auth/LoginView.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get('access_token');
  if (to.path !== '/auth/login') {
    if (token) {
      try {
        const payload = jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000); 
        if ((payload as any).exp < currentTime) {
          next('/auth/login');
        } else {
           if ((payload as { [key: string]: string })['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'SuperAdmin' || (payload as { [key: string]: string })['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin') {
            next(); 
          } else {
            next("/");
          }
        }
      } catch (error) {
        next('/auth/login');
      }
    } else {
      next('/auth/login');
    }
  } else {
    next();
  }
});
export default router
