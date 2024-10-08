const inoutkioskKioskRoutes = [
	{
		path: '/inoutkiosk',
		name: 'inoutkiosk',
		component: () => import('@/pages/inoutkiosk/Intro.vue'),
		title: 'Main',
		icon: 'far fa-bell fa-fw text-2xl',
		meta: { isMenu: true, layout: 'DefaultLayout02', requireAuth: false },
	},
	{
		path: '/inoutkiosk/keypad',
		name: 'inoutkioskkeypad',
		component: () => import('@/pages/inoutkiosk/keypad.vue'),
		title: 'Main',
		icon: 'far fa-bell fa-fw text-2xl',
		meta: { isMenu: true, layout: 'DefaultLayout02', requireAuth: false },
	},
	{
		path: '/inoutkiosk/authorize',
		name: 'inoutkioskauthorize',
		component: () => import('@/pages/inoutkiosk/authorize.vue'),
		title: 'Main',
		icon: 'far fa-bell fa-fw text-2xl',
		meta: { isMenu: true, layout: 'DefaultLayout02', requireAuth: false },
	},
	{
		path: '/inoutkiosk/test',
		name: 'inoutkiosktest',
		component: () => import('@/pages/inoutkiosk/test.vue'),
		title: 'Main',
		icon: 'far fa-bell fa-fw text-2xl',
		meta: { isMenu: true, layout: 'DefaultLayout02', requireAuth: false },
	},
]

export default inoutkioskKioskRoutes
