const inoutkioskKioskRoutes = [
	{
		path: '/inoutkiosk',
		name: 'inoutkiosk',
		component: () => import('@/pages/inoutkiosk/Intro.vue'),
		title: 'Main',
		icon: 'far fa-bell fa-fw text-2xl',
		meta: { isMenu: true, layout: 'DefaultLayout02', requireAuth: false },
	},
]

export default inoutkioskKioskRoutes
