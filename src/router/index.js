import { createRouter, createWebHistory } from 'vue-router';
//import store from '../store/index';
import Home from '../pages/Home.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      title: 'HOME',
      icon: 'fas fa-home fa-fw text-2xl',
      meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
    },
    // {
    //   path: '/info',
    //   name: 'info',
    //   component: Info,
    //   title: 'INFO',
    //   icon: 'far fa-bell fa-fw text-2xl',
    //   meta: { isMenu: false, layout: 'DefaultLayout', requireAuth: true },
    // },
    // {
    //   path: '/career',
    //   name: 'career',
    //   component: Career,
    //   title: 'CAREER',
    //   icon: 'far fa-bell fa-fw text-2xl',
    //   meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
    // },
    // {
    //   path: '/works',
    //   name: 'works',
    //   component: Works,
    //   title: 'WORKS',
    //   icon: 'far fa-bell fa-fw text-2xl',
    //   meta: { isMenu: false, layout: 'DefaultLayout', requireAuth: true },
    // },
    // {
    //   path: '/workintro',
    //   name: 'workintro',
    //   component: WorkIntro,
    //   title: 'WORKS',
    //   icon: 'far fa-bell fa-fw text-2xl',
    //   meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
    // },
    // {
    //   path: '/works/new/:contentId',
    //   name: 'worksDetailNew',
    //   component: WorksDetailNew,
    //   title: 'WORKSDETAILNEW',
    //   meta: { isMenu: false, layout: 'SubLayout', requireAuth: true },
    // },
    // {
    //   path: '/works/operation/:contentId',
    //   name: 'worksDetailOperation',
    //   component: WorksDetailOperation,
    //   title: 'WORKSDETAILOPERATION',
    //   meta: { isMenu: false, layout: 'SubLayout', requireAuth: true },
    // },
    // {
    //   path: '/works/frontend/:contentId',
    //   name: 'worksDetailFront',
    //   component: WorksDetailFront,
    //   title: 'WORKSDETAILFRONT',
    //   meta: { isMenu: false, layout: 'SubLayout', requireAuth: true },
    // },
    // {
    //   path: '/study',
    //   name: 'study',
    //   component: Study,
    //   title: 'STUDY',
    //   icon: 'far fa-bell fa-fw text-2xl',
    //   meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
    // },
    // {
    //   path: '/contact',
    //   name: 'contact',
    //   component: Contact,
    //   title: 'CONTACT',
    //   icon: 'far fa-bell fa-fw text-2xl',
    //   meta: { isMenu: true, layout: 'DefaultLayout', requireAuth: true },
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login,
    //   title: 'LOGIN',
    //   icon: 'far fa-bell fa-fw text-2xl',
    //   meta: { isMenu: false, layout: 'DefaultLayout', requireAuth: true },
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: Register,
    //   title: 'REGISTER',
    //   icon: 'far fa-bell fa-fw text-2xl',
    //   meta: { isMenu: false, layout: 'DefaultLayout', requireAuth: true },
    // },
    // {
    //   path: '/studycreate',
    //   name: 'studycreate',
    //   component: StudyCreate,
    //   title: 'STUDYCREATE',
    //   icon: 'far fa-bell fa-fw text-2xl',
    //   meta: { isMenu: false, layout: 'DefaultLayout', requireAuth: true },
    // },
    // {
    //   path: '/study/board/:id',
    //   name: 'studyDetailView',
    //   component: StudyDetailView,
    //   title: 'STUDYDETAILVIEW',
    //   meta: { isMenu: false, layout: 'SubLayout', requireAuth: true },
    // },
    // {
    //   path: '/news',
    //   name: 'news',
    //   component: News,
    //   title: 'NEWS',
    //   icon: 'far fa-bell fa-fw text-2xl',
    //   meta: { isMenu: false, layout: 'DefaultLayout', requireAuth: true },
    // },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'notFound',
    //   component: NotFound,
    //   meta: { isMenu: false },
    // },
  ],
  scrollBehavior(to, from, next) {

  },
});

router.beforeEach((to, from, next) => {  

  //next();
});

router.afterEach((to, from) => {
  
});

export default router;