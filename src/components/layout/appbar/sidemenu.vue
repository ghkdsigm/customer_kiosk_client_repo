<template>
	<div>
		<!-- 엠파크층별안내 -->
		<div
			class="min-h-0 flex-1 flex overflow-hidden sideArea"
			v-if="
				currentPath !== '/customerkiosk/searchcarmanufacturer' &&
				currentPath !== '/customerkiosk/searchcarnumber' &&
				currentPath !== '/customerkiosk/carsearchresults'
			"
		>
			<!-- 2Depth(층선택) -->
			<div
				class="flex-shrink-0 overflow-y-auto w-[4.5vw] secondTab"
				:class="{ secondTab02: currentPath === '/customerkiosk/store' }"
				v-if="
					checkSubMenu &&
					selectedMenu !== null &&
					currentPath !== '/customerkiosk/employee' &&
					currentPath !== '/customerkiosk/store'
				"
			>
				<ul>
					<li v-for="(item, idx) in selectedMenu.subMenu" :key="idx">
						<div
							class="flex justify-center items-center w-[3.8vw] h-[3.8vw] rounded-full secondTabItems"
							:class="{
								'bg-[#0C7E60] text-white': selectedSecondIndex === idx,
							}"
							@click="selectSecondMenu(idx)"
						>
							{{ item.title }}
						</div>
					</li>
				</ul>
			</div>

			<!-- 1Depth(단지선택) -->
			<div aria-label="Sidebar" class="lg:block flex-shrink-0 overflow-y-auto w-[7.7vw] firstTab">
				<!-- 로고 -->
				<p class="w-full h-[120px] flex bg-white">
					<img
						src="@/assets/img/side_logo.svg"
						alt="mpark"
						class="w-fit m-auto hover:cursor-pointer"
						@click="moveToIntro"
					/>
				</p>
				<!-- 버튼 -->
				<div class="w-full h-full relative grid grid-rows-3 bg-[#F8F8F8] sideMenuItem">
					<div
						class="h-full flex justify-center items-center hover:bg-[#169171] hover:text-white hover:cursor-pointer itemWrap"
						v-for="(item, idx) in sideItems"
						:class="{
							'bg-[#0C7E60] text-white': selectedIndex === idx,
						}"
						:key="idx"
						@click="selectMenu(idx)"
					>
						<div class="w-full h-full text">
							<p
								class="relative top-[4vh] text-[1vh]"
								:class="{ 'text-white': selectedIndex === idx, 'text-[#777]': selectedIndex !== idx }"
							>
								{{ item.subtit }}
							</p>
							<p
								class="relative top-[4vh] text-[2vh]"
								:class="{ 'text-white': selectedIndex === idx, 'text-[#262626]': selectedIndex !== idx }"
							>
								{{ item.title }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 구입차량조회메뉴 -->
		<div class="min-h-0 flex-1 flex overflow-hidden sideArea" v-else>
			<!-- 1Depth -->
			<div aria-label="SidebarCarSearch" class="lg:block flex-shrink-0 overflow-y-auto w-[7.7vw] firstTab">
				<p class="w-full h-[120px] flex bg-white">
					<img
						src="@/assets/img/side_logo.svg"
						alt="mpark"
						class="w-fit m-auto hover:cursor-pointer"
						@click="moveToIntro"
					/>
				</p>
				<div class="sideMenuItem02 relative w-full grid grid-rows-2 h-full bg-[#F8F8F8]">
					<div
						class="itemWrap flex justify-center items-center text-gray-400 hover:text-red-700 flex-col hover:bg-[#169171] hover:text-white text-gray-900 h-full hover:cursor-pointer"
						v-for="(item, idx) in searchCarMenu"
						:class="{
							'bg-[#0C7E60] text-white': selectedCarIndex === idx,
						}"
						:key="idx"
						@click="selectMenuCarSearch(idx)"
					>
						<div class="text-center text">
							<p
								class="text-[1vh]"
								:class="{ 'text-white': selectedCarIndex === idx, 'text-[#777]': selectedCarIndex !== idx }"
							>
								{{ item.subtit }}
							</p>
							<p
								class="text-[2vh]"
								:class="{ 'text-white': selectedCarIndex === idx, 'text-[#262626]': selectedCarIndex !== idx }"
							>
								{{ formatStringWithNewlines(item.title) }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed, ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'
import { useUtilities } from '@/utils/useUtilities'
import { sideCarSearch } from '@/data/common.js'

export default defineComponent({
	name: 'CommonLayoutAppbarSidemenu',
	props: {
		sideItems: {
			type: Array,
			default: () => [],
		},
	},
	setup(props, { emit }) {
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes.path)
		const router = useRouter()
		const checkSubMenu = computed(() => props.sideItems.find(v => v.subMenu.length !== 0))
		const selectedMenu = ref(null)
		const selectedIndex = ref(null)
		const selectedCarIndex = ref(null)
		const selectedSecondIndex = ref(null)
		const menuSelected = ref(false)
		const newTitle = ref('')
		const customerKioskStore = useCustomerKioskStore()

		const { formatStringWithNewlines } = useUtilities()

		const searchCarMenu = ref(sideCarSearch)

		onMounted(() => {
			if (currentPath.value === '/customerkiosk/searchcarnumber') {
				selectedCarIndex.value = 1
			} else if (currentPath.value === '/customerkiosk/searchcarmanufacturer') {
				selectedCarIndex.value = 0
			} else if (currentPath.value === '/customerkiosk/mpark') {
				selectMenu(0)
			} else {
				selectMenu(0)
			}
		})

		//장소선택
		const selectMenu = idx => {
			if (idx !== undefined && idx !== null) {
				selectedIndex.value = idx
				selectedMenu.value = props.sideItems[idx]
				selectedSecondIndex.value = 0
				newTitle.value = selectedMenu.value.subMenu[0].title
				//MPARK 단지 선택 상태관리
				updateDanjiTitle(selectedMenu.value.subtit)
				//MPARK 층별 선택 타이틀 상태관리
				updateFloorTitle(newTitle.value)
			}

			console.log('idx', selectedMenu.value)
		}

		//차조회방법선택
		const selectMenuCarSearch = idx => {
			if (idx !== undefined && idx !== null) {
				selectedCarIndex.value = idx
				if (idx === 0) {
					router.push({ name: 'searchcarmanufacturer' })
				} else {
					router.push({ name: 'searchcarnumber' })
				}
			}
		}

		//층별선택
		const selectSecondMenu = idx => {
			if (idx !== undefined && idx !== null) {
				selectedSecondIndex.value = idx
				selectedMenu.value ? (newTitle.value = selectedMenu.value.subMenu[selectedSecondIndex.value].title) : null
				//MPARK 층별 타이틀 상태관리
				updateFloorTitle(newTitle.value)
			}
		}

		watch(selectedMenu, newVal => {
			if (newVal !== null) {
				menuSelected.value = true
				emit('menu-selected', menuSelected.value)
			}
		})

		watch(currentPath, (newPath) => {
			if (newPath === '/customerkiosk/mpark') {
				selectMenu(0)
			}
		})

		const moveToIntro = () => {
			router.push({ name: 'intro' })
		}

		//MPARK 단지 선택 상태관리
		const updateDanjiTitle = val => {
			customerKioskStore.setDanjiTitle(val)
		}
		//MPARK 층별 선택 타이틀 상태관리
		const updateFloorTitle = val => {
			customerKioskStore.setFloorTitle(val)
		}

		return {
			currentRoutes,
			currentPath,
			router,
			checkSubMenu,
			selectedMenu,
			selectedIndex,
			selectedCarIndex,
			selectedSecondIndex,
			selectSecondMenu,
			selectMenu,
			moveToIntro,
			updateDanjiTitle,
			updateFloorTitle,
			newTitle,
			searchCarMenu,
			selectMenuCarSearch,
			formatStringWithNewlines,
		}
	},
})
</script>

<style lang="scss" scoped>
// 사이드 영역
.sideArea {
	height: calc(100% - 10vh);
	position: absolute;
	top: 0;
	right: 0;
	box-shadow: -4px 0px 15px 0px #00000026;
}
// 단지선택 메뉴
.sideMenuItem {
	height: calc(100% - 120px);
	.itemWrap {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		text-align: center;
		&::after {
			content: '';
			width: 100%;
			height: 50%;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			position: absolute;
			bottom: 0;
		}
		&:nth-of-type(1)::after {
			background-image: url('/src/assets/img/side/hub.png');
		}
		&:nth-of-type(2)::after {
			background-image: url('@/assets/img/side/tower.png');
		}
		&:nth-of-type(3)::after {
			background-image: url('@/assets/img/side/land.png');
		}
		&.active,
		&:hover {
			.text {
				p {
					color: #fff !important;
				}
			}
		}
	}
}
// 층선택
.secondTab {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	ul li .secondTabItems {
		text-align: center;
		font-size: 1.8vh;
		font-weight: 700;
		cursor: pointer;
	}
}

// .secondTab02 {
// 	height: 100vh
// }

// 구입차량조회메뉴
.sideMenuItem02 {
	height: calc(100% - 120px);
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	.itemWrap {
		&:first-child {
			border-bottom: 1px solid #ccc;
		}
		&:hover {
			.text {
				p {
					color: #fff !important;
				}
			}
		}
	}
}
@media all and (max-width: 1920px) {
	.sideMenuItem .itemWrap:nth-of-type(1)::after {
		background-position: top;
	}
	.sideMenuItem .itemWrap:nth-of-type(2)::after {
		background-position: top;
	}
	.sideMenuItem .itemWrap:nth-of-type(3)::after {
		background-position: top;
	}
}
</style>
