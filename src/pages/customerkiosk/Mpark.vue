<template>
	<div>
		<div class="position_info z-10 relative">
			<div class="flex items-end mb-[3vh]">
				<h1 class="mr-[1.8vw] mainTit">{{ floorTitle }}</h1>
				<span class="position text-[1.59vw]">{{ subTitle }}</span>
			</div>

			<ul class="flex list_item">
				<li>
					<span class="color c1"></span>
					<span class="name text-[0.85vw]">매매상사</span>
				</li>
				<li>
					<span class="color c2"></span>
					<span class="name text-[0.85vw]">지원시설</span>
				</li>
				<li>
					<span class="color c3"></span>
					<span class="name text-[0.85vw]">음식점</span>
				</li>
				<li>
					<span class="color c4"></span>
					<span class="name text-[0.85vw]">정비/세차/광택</span>
				</li>
				<li>
					<span class="color c5"></span>
					<span class="name text-[0.85vw]">기타</span>
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
				/>
				<!-- 상사및입점 -->
				<div
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
				</div>
				<!-- 기타공용공간 좌표 추가해야함!! -->
				<!-- <div
					v-for="(item, idx) in etcs"
					:key="idx"
					class="absolute font-normal leading-none text-center storeItem"
					style="
						font-size: 0.2vw;
						display: flex;
						align-items: center;
						justify-content: center;
						letter-spacing: 0.1px !important;
					"
					:style="{
						top: `${item.top}vw`,
						left: checkMapFold ? `${item.left - 1.15}vw` : `${item.left}vw`,
						width: `${item.width}vw`,
						height: `${item.height}vh`,
					}"
				>
					{{ item.title }}
				</div> -->
			</PinchScrollZoom>
		</div>

		<div class="facility">
			<div class="inner">
				<div class="mx-6 hover:cursor-pointer btn_item" :class="{ active: selected }" @click="boxSelected('done')">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_1.svg" alt="엘레베이터" class="w-fit" />
					</div>
					<p class="name text-[0.85vw]">엘레베이터</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item" @click="testpopup">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_2.svg" alt="화장실" class="w-fit" />
					</div>
					<p class="name text-[0.85vw]">화장실</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_3.svg" alt="장애인화장실" class="w-fit" />
					</div>
					<p class="name text-[0.85vw]">장애인화장실</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_4.svg" alt="은행/ATM" class="w-fit" />
					</div>
					<p class="name text-[0.85vw]">은행/ATM</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_5.svg" alt="업무지원센터" class="w-fit" />
					</div>
					<p class="name text-[0.85vw]">업무지원센터</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_6.svg" alt="비상구" class="w-fit" />
					</div>
					<p class="name text-[0.85vw]">비상구</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_7.svg" alt="고객주차장" class="w-fit" />
					</div>
					<p class="name text-[0.85vw]">고객주차장</p>
				</div>

				<div class="mx-6 hover:cursor-pointer btn_item">
					<div class="mb-[8px] icon">
						<img src="@/assets/img/facility/icon_8.svg" alt="무인정산기" class="w-fit" />
					</div>
					<p class="name text-[0.85vw]">무인정산기</p>
				</div>
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
	>
		<template #content>
			<p>팝업내용.</p>
		</template>
	</Popup05>
</template>

<script>
import { defineComponent, computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import { useMparkStore } from '@/store/mpark'
import PinchScrollZoom from '@coddicat/vue-pinch-scroll-zoom'
import { useUtilities } from '@/utils/useUtilities'

import { baseFloorFirst, towerFloorFirst, towerFloorSecond, towerFloorThird, towerEtcFloorFirst } from '@/data/tower.js'
import { landFloorFirst, landEtcFloorFirst } from '@/data/land.js'
import {
	hubFloorFirst,
	hubFloorSecond,
	hubFloorThrid,
	hubEtcFloorFirst,
	hubEtcFloorSecond,
	hubEtcFloorThird,
} from '@/data/hub.js'

//예시
// import { useProductsStore } from '@/stores/productsStore';
// import { storeToRefs } from 'pinia';

export default defineComponent({
	name: 'CustomerkioskMpark',
	components: {
		PinchScrollZoom,
	},
	setup() {
		const { titleEN } = useTitleEN()
		const mparkStore = useMparkStore()

		const danjiTitle = computed(() => mparkStore.danjiTitle)
		const floorTitle = computed(() => mparkStore.floorTitle)

		const { setImageSrc } = useUtilities()
		const imageSrc = (folder, img) => setImageSrc(folder, img)

		const zoomer = ref(null)
		const container = ref(null)
		const containerWidth = ref(1500)
		const containerHeight = ref(500)
		const checkMapFold = ref(false)
		const selectedStore = ref(null) // 클릭된 매장을 저장

		const isPopupVisible = ref(false)
		const scale = ref(2)

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
				'2F': '자동차 매매 전시장1',
				단지전체: '단지전체',
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
			},
		}
		//공용지역 맵핑
		const etcDataMap = {
			HUB: {
				'1F': hubEtcFloorFirst,
				'2F': hubEtcFloorSecond,
				'3F': hubEtcFloorThird,
			},
			TOWER: {
				B1: towerEtcFloorFirst,
			},
			LAND: {
				'1F': landEtcFloorFirst,
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

		const scalingHandler = e => {
			console.log(e)
		}

		//예시
		// const productsStore = useProductsStore();
		// const { filteredProducts } = storeToRefs(productsStore);

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

		onMounted(() => {
			updateContainerDimensions()
			window.addEventListener('resize', updateContainerDimensions)
			//예시
			//productsStore.fetchProducts();
		})

		onUnmounted(() => {
			window.removeEventListener('resize', updateContainerDimensions)
		})

		const selectStore = val => {
			if (val) {
				console.log('상사정보', val)
				selectedStore.value = val
			}
		}

		const testpopup = e => {
			isPopupVisible.value = true
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
			subTitle,
			stores,
			etcs,
			selectedStore,
			selectStore,
			isPopupVisible,
			testpopup,
			handleConfirm,
			handleCancel,
			imageSrc,
			//예시
			// filteredProducts,
		}
	},

	data() {
		return {
			selected: true,
		}
	},
	methods: {
		boxSelected(box) {
			if (box === 'done') {
				this.selected = !this.selected
			}
		},
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
	.btn_item {
		display: flex;
		flex-direction: column;
		align-items: center;
		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 2.7vw;
			aspect-ratio: 1/1;
			background-color: rgb(38, 38, 38, 0.8);
			border-radius: 100%;
			img {
				max-width: 1.4vw;
				height: auto;
			}
		}
		.name {
			font-size: 1.3vh;
			color: #555;
		}
	}
}

.storeItem {
	position: absolute;
	cursor: pointer;
}

.storeItem.active::after {
<<<<<<< HEAD
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
=======
  content: "";
  position: absolute;
  top: -2.5vw;
  left: 0;
  width: 100%;
  height: 70px;
  pointer-events: none;
  background-image: url('@/assets/img/map_maker.svg');
  background-size: 0.7vw 0.7vw;
  background-repeat: no-repeat;
  background-position: center;
>>>>>>> 7afb3a58728b3e243fad078faa5a2e1bac8a57cd
}
</style>
