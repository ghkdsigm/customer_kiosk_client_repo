import { createRouter, createWebHistory} from 'vue-router'
//import store from '../store/index';
import NotFound from '@/router/NotFound.vue'
import CustomerKioskRoutes from '@/router/customerKioskRoutes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //Empty Page
    { path: '/', 
      name: 'emptyHome', 
      component: () => import('@/pages/Index.vue'),
      title: 'emptyHome', 
      icon: 'far fa-bell fa-fw text-2xl', 
      meta: { isMenu: true, requireAuth: false } 
    },
    //Customer Kiosk
    ...CustomerKioskRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
      meta: { isMenu: true },
    },
  ]
});

export default router;