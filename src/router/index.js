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

// 경로 목록 정의
const customerKioskPaths = [
	'/customerkiosk',
	'/customerkiosk/mpark',
	'/customerkiosk/store',
	'/customerkiosk/employee',
	'/customerkiosk/searchcar',
	'/customerkiosk/searchcarmanufacturer',
	'/customerkiosk/searchcarnumber',
	'/customerkiosk/carsearchresults',
	'/customerkiosk/news',
]
const perfomances = 'introperformancestatus'
const inout = '/inoutkiosk'

// 전체화면 모드 요청 함수
const requestFullscreen = () => {
	const videoElement = document.documentElement
	const requestFullscreenMethods = [
		videoElement.requestFullscreen,
		videoElement.mozRequestFullScreen,
		videoElement.webkitRequestFullscreen,
		videoElement.msRequestFullscreen,
	]

	for (const method of requestFullscreenMethods) {
		if (method) {
			method.call(videoElement)
			break
		}
	}
}

router.beforeEach((to, from, next) => {
	console.log('to', to.name)
	console.log('customerKioskPaths.includes(to.path)', perfomances === to.name)

	// 전체화면 모드 전환 조건
	if (
		(customerKioskPaths.includes(to.path) && !document.fullscreenElement) ||
		perfomances === to.name ||
		inout.includes(to.path)
	) {
		requestFullscreen()
	}

	// 다음 단계로 진행
	next()
})

export default router
