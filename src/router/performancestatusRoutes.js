const performancestatusRoutes = [
	{
		path: '/performancestatus/:id',
		name: 'introperformancestatus',
		component: () => import('@/pages/performancestatus/Intro.vue'),
		title: 'Main',
		icon: 'far fa-bell fa-fw text-2xl',
		meta: { isMenu: true, layout: 'DefaultLayout03', requireAuth: false },
		beforeEnter: async (to, from, next) => {
			const id = to.params?.id
			if (!id) next({ name: '' })
			next()
		},
	},
]

export default performancestatusRoutes
