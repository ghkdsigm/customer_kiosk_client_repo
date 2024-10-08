<template>
	<div>
		<div class="position_info z-10 relative">
			<div class="flex items-end mb-[3vh]">
				<h1 class="mr-[1.8vw] mainTit">{{ floorTitle }}</h1>
				<span class="position text-[1.59vw]">{{ subTitle }}</span>
			</div>

			<ul class="flex list_item">
				<li v-for="(item, index) in listItems" :key="index">
					<span :class="`color c${index + 1}`"></span>
					<span class="name text-[0.85vw]">{{ item }}</span>
				</li>
			</ul>
		</div>

		<div class="absolute top-0 left-0 right-0 bottom-0 overflow-hidden z-0 m-12 w-[auto] h-[auto]" ref="container">
			<PinchScrollZoom
				ref="zoomer"
				:width="containerWidth"
				:height="containerHeight"
				:scale="scale"
				@scaling="scalingHandler"
			>
				<img
					class="mparkMap"
					:src="
						danjiTitle === 'HUB'
							? imageSrc('introduce/hub', `hub_${floorTitle}`)
							: danjiTitle === 'TOWER'
								? imageSrc('introduce/tower', `tower_${floorTitle}`)
								: imageSrc('introduce/land', floorTitle === '단지전체' ? 'land_AF' : `land_${floorTitle}`)
					"
					:style="{ width: containerWidth, height: containerHeight, left: checkMapFold ? '20.85vw' : '22vw' }"
					style="max-height: 40vh; top: 7vw; position: relative"
					@load="onImageLoad"
				/>
				<!-- 상사및입점//데이터바인딩 -->
				<div v-if="isLoaded">
					<div
						v-for="(item, idx) in filterStore"
						:key="idx"
						class="absolute font-normal leading-none text-center storeItem"
						:class="{ active: selectedStore && selectedStore.officeCode === item?.officeCode }"
						style="font-size: 0.2vw; display: flex; align-items: center; justify-content: center"
						:style="{
							top: `${item?.top}vw`,
							left: checkMapFold ? `${item?.left - 1.15}vw` : `${item?.left}vw`,
							width: `${item?.width}vw`,
							height: `${item?.height}vh`,
						}"
						@click="selectStore(item)"
					>
						<ul style="height: 100%">
							<li
								v-for="(el, index) in uniqueCompanies(item.companyList)"
								:key="index"
								style="letter-spacing: 0px !important; display: flex; align-items: center; height: 100%"
							>
								{{ el?.companyName }}
							</li>
						</ul>
					</div>
				</div>

				<!-- 상사및입점//퍼블용 -->
				<!-- <div
					v-for="(item, idx) in stores"
					:key="idx"
					class="absolute font-normal leading-none text-center storeItem"
					:class="{ active: selectedStore && selectedStore.id === item.id }"
					style="
						font-size: 0.2vw;
						display: flex;
						align-items: center;
						justify-content: center;
						letter-spacing: 0.1px !important;
						word-break: keep-all;
						background-color: rgba(255, 214, 0, 0.5);
					"
					:style="{
						top: `${item.top}vw`,
						left: checkMapFold ? `${item.left - 1.15}vw` : `${item.left}vw`,
						width: `${item.width}vw`,
						height: `${item.height}vh`,
					}"
					@click="selectStore(item)"
				>
					{{ item.title }}
				</div> -->

				<!-- 기타공용공간 좌표 추가해야함!! -->
				<div
					v-for="(item, idx) in etcs"
					:key="idx"
					class="absolute font-normal leading-none text-center storeItem etcIcon"
					style="
						font-size: 0.2vw;
						display: flex;
						align-items: center;
						justify-content: center;
						letter-spacing: 0.1px !important;
						word-break: keep-all;
					"
					:style="{
						top: `${item.top}vw`,
						left: checkMapFold ? `${item.left - 1.15}vw` : `${item.left}vw`,
						width: `1vw`,
						height: `auto`,
					}"
				>
					<img :src="filterEtcItem('facility', item.title)" :alt="item.title" class="w-fit" />
				</div>
			</PinchScrollZoom>
		</div>

		<div class="facility">
			<div class="inner">
				<FacilityButton
					v-for="(item, index) in facilityItems"
					:key="index"
					:icon="item.icon"
					:label="item.label"
					:active="selected === item.label"
					@click="boxSelected(item.label)"
				/>
			</div>
		</div>
	</div>
	<!-- <Popup02
		v-model:visible="isPopupVisible"
		title="팝업 제목"
		confirmText="확인"
		cancelText="취소"
		@confirm="handleConfirm"
		@cancel="handleCancel"
	>
		<template #content>
			<p>팝업내용.</p>
		</template>
	</Popup02> -->
	<Popup05
		v-model:visible="isPopupVisible"
		title="팝업 제목"
		confirmText="확인"
		cancelText="취소"
		@confirm="handleConfirm"
		@cancel="handleCancel"
		:items="selectedStore"
	>
	</Popup05>
</template>

<script>
import { defineComponent, computed, ref, watch, onMounted, onUnmounted, nextTick, reactive } from 'vue'
import PinchScrollZoom from '@coddicat/vue-pinch-scroll-zoom'
import FacilityButton from '@/components/customerkiosk/mpark/facilitybutton.vue'
import { useTitleEN } from '@/composables/useTitleEN'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'
import { useUtilities } from '@/utils/useUtilities'
import {
	baseFloorFirst,
	towerFloorFirst,
	towerFloorSecond,
	towerFloorThird,
	towerEtcbaseFloorFirst,
	towerEtcFloorFirst,
	towerEtcFloorSecond,
	towerEtcFloorThird,
	towerEtcFloorFourth,
	towerEtcFloorFifth,
	towerEtcFloorSixth,
	towerEtcFloorSeventh,
	towerEtcFloorEighth,
	towerEtcFloorNine,
} from '@/data/tower.js'
import {
	landFloorFirst,
	landFloorSecond,
	landFloorAF,
	landEtcFloorFirst,
	landEtcFloorSecond,
	landEtcFloorEtc,
} from '@/data/land.js'
import {
	hubFloorFirst,
	hubFloorSecond,
	hubFloorThrid,
	hubEtcFloorFirst,
	hubEtcFloorSecond,
	hubEtcFloorThird,
	hubEtcFloorFourth,
	hubEtcFloorFifth,
	hubEtcFloorSixth,
	hubEtcFloorSeventh,
	hubEtcFloorEighth,
	hubEtcFloorNine,
} from '@/data/hub.js'

export default defineComponent({
	name: 'CustomerkioskMpark',
	components: {
		PinchScrollZoom,
		FacilityButton,
	},
	setup() {
		const { titleEN } = useTitleEN()
		const customerKioskStore = useCustomerKioskStore()

		const danjiTitle = computed(() => customerKioskStore.danjiTitle)
		const floorTitle = computed(() => customerKioskStore.floorTitle)
		const tab = computed(() => (danjiTitle.value === 'TOWER' ? 10 : danjiTitle.value === 'LAND' ? 11 : 18))

		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)

		const zoomer = ref(null)
		const container = ref(null)
		const containerWidth = ref(1500)
		const containerHeight = ref(500)
		const checkMapFold = ref(false)
		const selected = ref(true)
		const selectedStore = ref(null) // 클릭된 매장을 저장

		const isPopupVisible = ref(false)
		const scale = ref(2)

		const isLoaded = ref(false)

		const listItems = ref(['매매상사', '지원시설', '음식점', '정비/세차/광택', '기타'])

		const facilityItems = ref([
			{ icon: 'icon_1', label: '엘레베이터' },
			{ icon: 'icon_2', label: '화장실' },
			{ icon: 'icon_3', label: '장애인화장실' },
			{ icon: 'icon_4', label: '은행/ATM' },
			{ icon: 'icon_5', label: '업무지원센터' },
			{ icon: 'icon_6', label: '비상구' },
			{ icon: 'icon_7', label: '고객주차장' },
			{ icon: 'icon_8', label: '무인정산기' },
		])

		const filterEtcItem = (folder, title) => {
			const item = facilityItems.value.find(x => x.label === title)
			if (item) {
				return setImageSrc(folder, item.icon)
			}
			return null
		}

		const tabData = reactive({
			HUB: null,
			LAND: null,
			TOWER: null,
		})
		// const tabData = ref({
		// 	TOWER: [],
		// 	LAND: [],
		// 	HUB: [],
		// })

		//부제목
		const subTitleDataMap = {
			HUB: {
				'1F': '자동차 매매 전시장1',
				'2F': '자동차 매매 전시장2',
				'3F': '자동차 매매 전시장3',
				'4F': '자동차 매매 전시장4',
				'5F': '자동차 매매 전시장5',
				'6F': '자동차 매매 전시장6',
				'7F': '자동차 매매 전시장7',
				'8F': '자동차 매매 전시장8',
				'9F': '자동차 매매 전시장9',
			},
			TOWER: {
				B1: '주차장',
				'1F': '자동차 매매 전시장1',
				'2F': '자동차 매매 전시장2',
				'3F': '자동차 매매 전시장3',
				'4F': '자동차 매매 전시장4',
				'5F': '자동차 매매 전시장5',
				'6F': '자동차 매매 전시장6',
				'7F': '자동차 매매 전시장7',
				'8F': '자동차 매매 전시장8',
				'9F': '자동차 매매 전시장9',
			},
			LAND: {
				'1F': '자동차 매매 전시장1',
				'2F': '자동차 매매 전시장2',
				AF: '단지전체',
			},
		}
		//단지&층별 맵핑
		const storeDataMap = {
			HUB: {
				'1F': hubFloorFirst,
				'2F': hubFloorSecond,
				'3F': hubFloorThrid,
			},
			TOWER: {
				B1: baseFloorFirst,
				'1F': towerFloorFirst,
				'2F': towerFloorSecond,
				'3F': towerFloorThird,
			},
			LAND: {
				'1F': landFloorFirst,
				'2F': landFloorSecond,
				AF: landFloorAF,
			},
		}
		//공용지역 맵핑
		const etcDataMap = {
			HUB: {
				'1F': hubEtcFloorFirst,
				'2F': hubEtcFloorSecond,
				'3F': hubEtcFloorThird,
				'4F': hubEtcFloorFourth,
				'5F': hubEtcFloorFifth,
				'6F': hubEtcFloorSixth,
				'7F': hubEtcFloorSeventh,
				'8F': hubEtcFloorEighth,
				'9F': hubEtcFloorNine,
			},
			TOWER: {
				B1: towerEtcbaseFloorFirst,
				'1F': towerEtcFloorFirst,
				'2F': towerEtcFloorSecond,
				'3F': towerEtcFloorThird,
				'4F': towerEtcFloorFourth,
				'5F': towerEtcFloorFifth,
				'6F': towerEtcFloorSixth,
				'7F': towerEtcFloorSeventh,
				'8F': towerEtcFloorEighth,
				'9F': towerEtcFloorNine,
			},
			LAND: {
				'1F': landEtcFloorFirst,
				'2F': landEtcFloorSecond,
				AF: landEtcFloorEtc,
			},
		}
		const subTitle = computed(() => {
			return subTitleDataMap[danjiTitle.value]?.[floorTitle.value] || []
		})
		const stores = computed(() => {
			return storeDataMap[danjiTitle.value]?.[floorTitle.value] || []
		})
		const etcs = computed(() => {
			return etcDataMap[danjiTitle.value]?.[floorTitle.value] || []
		})

		const filterStore = computed(() => {
			return stores.value
				.map(item1 => {
					const matchingItem = tabData[danjiTitle.value]?.find(item2 => item2.officeCode === item1.id)
					if (matchingItem) {
						return {
							...matchingItem,
							width: item1.width,
							top: item1.top,
							left: item1.left,
							height: item1.height,
						}
					}
				})
				.filter(Boolean)
		})

		const scalingHandler = e => {
			console.log(e)
		}

		const updateContainerDimensions = () => {
			if (container.value) {
				console.log('업데이트 값', container.value.offsetWidth)
				containerWidth.value = container.value.offsetWidth
				containerHeight.value = container.value.offsetHeight
			}
		}

		watch(() => [container.value?.offsetWidth, container.value?.offsetHeight], updateContainerDimensions)

		watch(
			() => floorTitle.value,
			async newval => {
				if (newval) {
					console.log('newval', newval)
					checkMapFold.value = true
					await nextTick()
					updateContainerDimensions()
				}
			},
		)

		onMounted(async () => {
			try {
				const [tower, land, hub] = await Promise.all([getStore(10), getStore(11), getStore(18)])

				tabData.TOWER = tower
				tabData.LAND = land
				tabData.HUB = hub
				// updateTabData('TOWER', tower)
				// updateTabData('LAND', land)
				// updateTabData('HUB', hub)

				updateContainerDimensions()
				window.removeEventListener('resize', updateContainerDimensions)
			} catch (error) {
				console.error('error', error)
			}
		})

		const updateTabData = (key, newData) => {
			tabData.value[key] = JSON.parse(JSON.stringify(newData))
		}

		const selectStore = val => {
			if (val) {
				isPopupVisible.value = true
				console.log('상사정보', val)
				selectedStore.value = val
			}
		}
		// 중복 제거
		const uniqueCompanies = companyList => {
			const uniqueNames = new Set()
			return companyList.filter(el => {
				if (!uniqueNames.has(el.companyName)) {
					uniqueNames.add(el.companyName)
					return true
				}
				return false
			})
		}

		//공통팝업용
		const handleConfirm = () => {
			console.log('확인 버튼이 클릭되었습니다.')
			isPopupVisible.value = false // 팝업 닫기
		}
		//공통팝업용
		const handleCancel = () => {
			console.log('취소 버튼이 클릭되었습니다.')
			isPopupVisible.value = false // 팝업 닫기
		}

		//이미지 로드완료
		const onImageLoad = () => {
			isLoaded.value = true
		}

		const getStore = async params => {
			const res = await customerKioskStore.fetchContractList(params)
			return res.data
		}

		const boxSelected = box => {
			if (box === 'done') {
				selected.value = !selected.value
			}
		}

		// const filterStoreCheck = () => {
		// 	stores.value?.map(item1 => {
		// 		const matchingItem = tabData[danjiTitle.value]?.find(item2 => item2.officeCode === item1.id)
		// 		if (matchingItem) filterStore.value.push(matchingItem)
		// 	})
		// }

		return {
			titleEN,
			danjiTitle,
			floorTitle,
			zoomer,
			container,
			containerWidth,
			containerHeight,
			scale,
			scalingHandler,
			checkMapFold,
			listItems,
			facilityItems,
			subTitle,
			stores,
			etcs,
			selected,
			selectedStore,
			selectStore,
			isPopupVisible,
			handleConfirm,
			handleCancel,
			imageSrc,
			isLoaded,
			onImageLoad,
			tab,
			tabData,
			filterStore,
			boxSelected,
			filterEtcItem,
			uniqueCompanies,
		}
	},
})
</script>

<style lang="scss" scoped>
.mparkMap {
	pointer-events: none;
}
.position_info {
	h1 {
		font-size: 10vh;
		line-height: 0.8;
	}
	.position {
		font-size: 2.3vh;
		font-weight: 500;
	}
	.list_item {
		li {
			margin-right: 26px;
			.color {
				display: inline-block;
				width: 0.5vw;
				margin-right: 3px;
				aspect-ratio: 1/1;
				content: '';
				&.c1 {
					background-color: #aed6b3;
				}
				&.c2 {
					background-color: #c2e9ed;
				}
				&.c3 {
					background-color: #f1cdde;
				}
				&.c4 {
					background-color: #83c0bd;
				}
				&.c5 {
					background-color: #7492ac;
				}
			}
		}
	}
}

.facility {
	position: fixed;
	left: 45%;
	bottom: 15vh;
	transform: translateX(-50%);
	.inner {
		display: flex;
	}
}

.storeItem {
	position: absolute;
	cursor: pointer;
}

.storeItem.active::after {
	// content: '';
	// position: absolute;
	// top: -2.5vw;
	// left: 0;
	// width: 100%;
	// height: 70px;
	// pointer-events: none;
	// background-image: url('@/assets/img/map_maker.svg');
	// background-size: 0.7vw 0.7vw;
	// background-repeat: no-repeat;
	// background-position: center;
	content: '';
	position: absolute;
	top: -1vh;
	//left: 0.7vw;
	width: 0.6vw;
	height: 1.3vh;
	pointer-events: none;
	background-image: url(/src/assets/img/map_maker.svg);
	background-size: 0.7vw 0.7vw;
	background-repeat: no-repeat;
	background-position: center;
}

.etcIcon {
	cursor: none;
	aspect-ratio: 1/1;
	background-color: rgba(38, 38, 38, 0.8);
	border-radius: 100%;
	img {
		max-width: 0.4vw;
		height: auto;
	}
}
.etcIcon {
	&:hover {
		cursor: auto;
	}
}
</style>
