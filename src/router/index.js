import { createRouter, createWebHistory} from 'vue-router'
//import store from '../store/index';
import Intro from '../pages/Intro.vue'
import Mpark from '../pages/Mpark.vue'
import Store from '../pages/Store.vue'
import Employee from '../pages/Employee.vue'
import SearchCar from '../pages/SearchCar.vue'
import SearchCarNumber from '../pages/SearchCarNumber.vue'
import News from '../pages/News.vue'
import NotFound from './NotFound.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', 
      name: 'intro', 
      component: Intro, 
      title: 'Main', 
      icon: 'far fa-bell fa-fw text-2xl', 
      meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true } 
    },
    {
      path: '/mpark',
      name: 'mpark',
      component: Mpark,
      title: '엠파크안내',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: true, titleEN: '', },
    },
    {
      path: '/store',
      name: 'store',
      component: Store,
      title: '매장안내',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: true, titleEN: 'STORE SEARCH', },
    },
    {
      path: '/employee',
      name: 'employee',
      component: Employee,
      title: '종사원조회',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: true, titleEN: 'DEALER SEARCH', },
    },
    {
      path: '/searchcar',
      name: 'searchcar',
      component: SearchCar,
      title: '구입차량검색',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: true, titleEN: 'CAR SEARCH', },
    },
    {
      path: '/searchcarnumber',
      name: 'searchcarnumber',
      component: SearchCarNumber,
      title: '차량번호검색',      
      meta: { isMenu: true, layout: 'SideLayout', requireAuth: true, titleEN: 'CAR SEARCH', },
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      title: '한국일보',
      meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true, titleEN: 'News', },
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