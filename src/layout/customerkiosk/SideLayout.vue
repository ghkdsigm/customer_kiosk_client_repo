<template>
	<div class="w-full h-full absolute overflow-hidden">
		<!--Main Section-->
		<div
			class="relative screenArea"
			:class="[
				{
					secondMenu:
						checkSide === true &&
						currentPath !== '/customerkiosk/searchcarmanufacturer' &&
						currentPath !== '/customerkiosk/searchcarnumber' &&
						currentPath !== '/customerkiosk/carsearchresults' &&
						currentPath !== '/customerkiosk/employee' &&
						currentPath !== '/customerkiosk/store',
				},
				{
					'bg-[#EBEFF2]':
						currentPath === '/customerkiosk/searchcarmanufacturer' ||
						currentPath === '/customerkiosk/searchcarnumber' ||
						currentPath === '/customerkiosk/carsearchresults',
				},
				{ screenArea02: currentPath === '/customerkiosk/store' },
			]"
		>
			<div class="mx-auto h-full 2xl:p-22 p-[3vh]">
				<router-view v-slot="{ Component }">
					<component :is="Component"></component>
				</router-view>
			</div>
		</div>
		<!--Side Menu-->
		<SideMenu :sideItems="sideItems" @menu-selected="handleMenuSelected" />

		<!--Search Keyboard-->
		<Search v-if="currentPath.includes('/employee') && checkEmployee && keboardUse" />
	</div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
//import router from '../router'
import SideMenu from '@/components/layout/appbar/sidemenu.vue'
import Search from '@/components/common/keyboard/customKeyboard.vue'
import { useRoute } from 'vue-router'
import { useCommonStore } from '@/store/common'
import { useMparkStore } from '@/store/mpark'
import { sideAreaSearch } from '@/data/common'

export default {
	components: {
		SideMenu,
		Search,
	},
	props: {
		// bottomItems: {
		//   type:Array,
		//   default:(()=>[])
		// }
	},
	setup() {
		let checkEmployee = ref(true)
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes.path)
		const commonStore = useCommonStore()
		//const routes = ref([])

		const mparkStore = useMparkStore()
		const keboardUse = computed(() => mparkStore.keboardUse)

		//Side전용
		const sideItems = ref(sideAreaSearch)

		const checkSide = ref(false)
		// onBeforeMount(()=>{
		//   routes.value = router.options.routes.filter((route) => route.meta.isMenu == true)
		// });

		const handleMenuSelected = menuSelected => {
			console.log('Menu selected:', menuSelected)
			if (menuSelected) {
				checkSide.value = true
			} else {
				checkSide.value = false
			}
		}

		const toggleKeyboard = () => {
			commonStore.setKeyBoardUse()
		}

		onMounted(() => {})

		return {
			// routes,
			// router,
			checkEmployee,
			sideItems,
			handleMenuSelected,
			checkSide,
			currentPath,
			toggleKeyboard,
			keboardUse,
		}
	},
}
</script>

<style scoped>
.screenArea {
	height: calc(100% - 10vh);
	width: calc(100% - 7.7vw);
}
.screenArea02 {
	height: calc(100% - 18vh);
}
.screenArea.secondMenu {
	width: calc(100% - 12.2vw) !important;
}
</style>
