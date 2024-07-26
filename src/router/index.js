import { createRouter, createWebHistory} from 'vue-router'
//import store from '../store/index';
import NotFound from '@/router/NotFound.vue'


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
    { path: '/customerkiosk', 
      name: 'intro',       
      component: () => import('@/pages/customerkiosk/Intro.vue'),
      title: 'Main', 
      icon: 'far fa-bell fa-fw text-2xl', 
      meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: false } 
    },
    {
      path: '/customerkiosk/mpark',
      name: 'mpark',
      component: () => import('@/pages/customerkiosk/Mpark.vue'),
      title: '엠파크안내',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: false, titleEN: '', },
    },
    {
      path: '/customerkiosk/store',
      name: 'store',
      component: () => import('@/pages/customerkiosk/Store.vue'),
      title: '매장안내',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: false, titleEN: 'STORE SEARCH', },
    },
    {
      path: '/customerkiosk/employee',
      name: 'employee',
      component: () => import('@/pages/customerkiosk/Employee.vue'),
      title: '종사원조회',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: false, titleEN: 'DEALER SEARCH', },
    },
    {
      path: '/customerkiosk/searchcar',
      name: 'searchcar',
      component: () => import('@/pages/customerkiosk/SearchCar.vue'),
      title: '구입차량검색',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: false, titleEN: 'CAR SEARCH', },
    },
    {
      path: '/customerkiosk/searchcarnumber',
      name: 'searchcarnumber',
      component: () => import('@/pages/customerkiosk/SearchCarNumber.vue'),
      title: '차량번호검색',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: false, titleEN: 'CAR SEARCH', },
    },
    {
      path: '/customerkiosk/news',
      name: 'news',
      component: () => import('@/pages/customerkiosk/News.vue'),
      title: '한국일보',
      meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: false, titleEN: 'News', },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
      meta: { isMenu: true },
    },
  ]
});

export default router;