import { createRouter, createWebHistory } from 'vue-router'
//import store from '../store/index';
import NotFound from '@/router/NotFound.vue'
import CustomerKioskRoutes from '@/router/customerKioskRoutes'
import InOutKioskKioskRoutes from '@/router/inoutkioskRoutes'
import PerformanceStatusRoutes from '@/router/performancestatusRoutes'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		//Empty Page
		{
			path: '/',
			name: 'emptyHome',
			component: () => import('@/pages/Index.vue'),
			title: 'emptyHome',
			icon: 'far fa-bell fa-fw text-2xl',
			meta: { isMenu: true, requireAuth: false },
		},
		//Custom Kiosks
		...CustomerKioskRoutes,
		...InOutKioskKioskRoutes,
		...PerformanceStatusRoutes,
		{
			path: '/:pathMatch(.*)*',
			name: 'notFound',
			component: NotFound,
			meta: { isMenu: true },
		},
	],
})

console.log(CustomerKioskRoutes) // 배열이 제대로 출력되는지 확인
console.log(InOutKioskKioskRoutes) // 배열이 제대로 출력되는지 확인
console.log(PerformanceStatusRoutes) // 배열이 제대로 출력되는지 확인

export default router
