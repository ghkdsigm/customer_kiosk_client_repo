import { createRouter, createWebHistory} from 'vue-router'
//import store from '../store/index';
import Index from '@/pages/Index.vue'
import Intro from '@/pages/customerkiosk/Intro.vue'
import Mpark from '@/pages/customerkiosk/Mpark.vue'
import Store from '@/pages/customerkiosk/Store.vue'
import Employee from '@/pages/customerkiosk/Employee.vue'
import SearchCar from '@/pages/customerkiosk/SearchCar.vue'
import SearchCarNumber from '@/pages/customerkiosk/SearchCarNumber.vue'
import News from '@/pages/customerkiosk/News.vue'
import NotFound from './NotFound.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    //Empty Page
    { path: '/', 
      name: 'emptyHome', 
      component: Index, 
      title: 'emptyHome', 
      icon: 'far fa-bell fa-fw text-2xl', 
      meta: { isMenu: true, requireAuth: false } 
    },
    //Customer Kiosk
    { path: '/customerkiosk', 
      name: 'intro', 
      component: Intro, 
      title: 'Main', 
      icon: 'far fa-bell fa-fw text-2xl', 
      meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: false } 
    },
    {
      path: '/customerkiosk/mpark',
      name: 'mpark',
      component: Mpark,
      title: '엠파크안내',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: false, titleEN: '', },
    },
    {
      path: '/customerkiosk/store',
      name: 'store',
      component: Store,
      title: '매장안내',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: false, titleEN: 'STORE SEARCH', },
    },
    {
      path: '/customerkiosk/employee',
      name: 'employee',
      component: Employee,
      title: '종사원조회',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: false, titleEN: 'DEALER SEARCH', },
    },
    {
      path: '/customerkiosk/searchcar',
      name: 'searchcar',
      component: SearchCar,
      title: '구입차량검색',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: false, titleEN: 'CAR SEARCH', },
    },
    {
      path: '/customerkiosk/searchcarnumber',
      name: 'searchcarnumber',
      component: SearchCarNumber,
      title: '차량번호검색',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: false, titleEN: 'CAR SEARCH', },
    },
    {
      path: '/customerkiosk/news',
      name: 'news',
      component: News,
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