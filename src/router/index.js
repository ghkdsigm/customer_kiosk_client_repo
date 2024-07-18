import { createRouter, createWebHistory} from 'vue-router'
//import store from '../store/index';
import Home from '../pages/Home.vue'
import Sub01 from '../pages/Sub01.vue';
import Intro from '../pages/Intro.vue'
import NotFound from './NotFound.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: '/', 
    //   name: 'home', 
    //   component: Home, 
    //   title: '홈', 
    //   icon: 'fas fa-home fa-fw text-2xl', 
    //   meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true }
    // },
    { path: '/', 
      name: 'intro', 
      component: Intro, 
      title: '엠파크', 
      icon: 'far fa-bell fa-fw text-2xl', 
      meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true } 
    },
    {
      path: '/sub01',
      name: 'sub01',
      component: Sub01,
      title: 'Sub01Page',
      meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
      meta: { isMenu: true },
    },
  ],
  scrollBehavior(to, from, next) {

  },
});

// router.beforeEach((to, from, next) => {  

//   //next();
// });

// router.afterEach((to, from) => {
  
// });

export default router;