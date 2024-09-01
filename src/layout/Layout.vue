<template>
	<transition name="route" mode="out-in">
		<component :is="layout" v-bind="currentPath.includes('/customerkiosk') ? { bottomItems } : {}"></component>
	</transition>

	<!--CustomerKiosk Bottom Menu-->
	<BottomMenu :bottomItems="bottomItems" v-if="currentPath.includes('/customerkiosk')" />
</template>

<script>
import DefaultLayout from '@/layout/customerkiosk/DefaultLayout.vue'
import SideLayout from '@/layout/customerkiosk/SideLayout.vue'
import EmptyLayout from '@/layout/customerkiosk/EmptyLayout.vue'

import DefaultLayout02 from '@/layout/inoutkiosk/DefaultLayout.vue'

import DefaultLayout03 from '@/layout/performancestatus/DefaultLayout.vue'

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomMenu from '@/components/layout/appbar/bottommenu.vue'
import { bottomMenu } from '@/data/common.js'

export default {
	components: {
		DefaultLayout,
		SideLayout,
		EmptyLayout,
		DefaultLayout02,
		DefaultLayout03,
		BottomMenu,
	},
	setup() {
		const route = useRoute()
		const currentPath = computed(() => route.path)
		const layout = computed(() => route.meta.layout || 'DefaultLayout' || 'SideLayout')

		//CustomerKioskBottom 전용
		const bottomItems = ref(bottomMenu)

		return {
			layout,
			bottomItems,
			currentPath,
		}
	},
}
</script>

<style>
/*컴포넌트 이동 트랜지션*/
/* .route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active{
  transition: all 0.1s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active{
  transition: all 0.1s ease-in;
} */
</style>
