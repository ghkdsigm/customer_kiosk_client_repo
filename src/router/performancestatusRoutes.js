const performancestatusRoutes = [
	{
		path: '/performancestatus',
		name: 'introperformancestatus',
		component: () => import('@/pages/performancestatus/Intro.vue'),
		title: 'Main',
		icon: 'far fa-bell fa-fw text-2xl',
		meta: { isMenu: true, layout: 'DefaultLayout03', requireAuth: false },
	},
]

export default performancestatusRoutes
