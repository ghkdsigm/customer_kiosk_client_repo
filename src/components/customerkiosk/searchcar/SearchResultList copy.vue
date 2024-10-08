<template>
	<div class="containerBox">
		<div class="swiper_inner h-[64vh]">
			<swiper
				:slidesPerView="5"
				:grid="{
					rows: 2,
					fill: 'row',
				}"
				ref="swiperRef"
				:onSwiper="setSwiperRef"
				:space-between="100"
				:slides-per-group="5"
				:pagination="false"
				:modules="modules"
				:navigation="{
					nextEl: '.arrowRight',
					prevEl: '.arrowLeft',
				}"
				:loop="false"
				:loopFillGroupWithBlank="false"
				@slideChange="onSlideChange"
				class="mySwiper"
			>
				<!-- :class="items.length < 10 ? 'flex-nowrap flex-row' : 'flex-wrap flex-col'" -->
				<swiper-slide v-for="(item, idx) in currentItems" :key="idx" class="flex justify-center items-center">
					<SearchCarCard @click="searchCarDetail(item)" :item="item" />
				</swiper-slide>
			</swiper>
		</div>
		<div class="custom-pagination">
			<span
				v-for="(item, index) of display"
				:key="index"
				:class="{ active: item === activePage }"
				@click="goToPage(item)"
				class="pagination-bullet"
			>
				{{ item }}
			</span>
		</div>
		<button class="arrowLeft arrow z-10">
			<img src="@/assets/img/icn/slider_left.svg" alt="left" />
		</button>
		<button class="arrowRight arrow z-10">
			<img src="@/assets/img/icn/slider_right.svg" alt="right" />
		</button>
	</div>
</template>

<script>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
// import required modules
import { Navigation, Grid, Pagination, Scrollbar, A11y } from 'swiper/modules'
import SearchCarCard from '@/components/customerkiosk/searchcar/card.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default {
	props: {
		items: {
			type: Array,
			required: true,
		},
	},
	components: {
		Swiper,
		SwiperSlide,
		SearchCarCard,
	},
	name: 'CustomerKioskSearchCarSearchResultList',
	setup(props, { emit }) {
		const isPopupVisible = ref(false)
		const activePage = ref(1) //

		//swiper
		const swiperRef = ref(null)
		let previousPage = ref(null)
		const checkGroup = 100 //보여주고싶은 한번의 랜더링 양
		const checkGroupPaging = 10 //보여주고싶은 페이징 양
		const currentPage = ref(1) //현재 페이징
		const start = ref(0) //10개가 되면 10깨씩 추가될 카운팅
		const totalPaging = ref(Math.ceil(props.items.length / 10) + 1) //총 데이터 나누기 10
		const originList = computed(() => props.items)

		const currentItems = ref([...props.items.slice(start.value, start.value + checkGroup)])

		const display = ref([])

		const setSwiperRef = swiper => {
			swiperRef.value = swiper
		}

		const searchCarDetail = e => {
			isPopupVisible.value = true
			console.log('check', e)
			emit('searchCarDetail', e)
		}

		const loadMoreItems = swiper => {
			start.value += 10
		}
		const handleBackNavigation = swiper => {
			start.value -= 10
		}

		const onSlideChange = swiper => {
			console.log('swiper', swiper)
			currentPage.value = Math.ceil(swiper.activeIndex / 5 + 1)
			activePage.value = currentPage.value

			//
			console.log('currentPage', currentPage.value)

			// if(calculateCounting(currentPage.value)){
			// 	loadMoreItems(swiper)
			// }

			// 슬라이드가 끝에 도달했을 때 다음 데이터 로드
			// if (swiper.isEnd) {
			// 	alert('adsf')
			// 	swiper.activeIndex = 0
			// }

			if (previousPage.value === null) {
				previousPage.value = currentPage.value
				return // 초기 설정 시 아무 작업도 하지 않음
			}

			if (currentPage.value > previousPage.value) {
				// 페이지가 앞으로 이동하는 경우
				if (currentPage.value % 10 === 0) {
					loadMoreItems(swiper)
				}
			} else if (currentPage.value < previousPage.value) {
				// 페이지가 뒤로 이동하는 경우
				if (previousPage.value % 10 === 0) {
					handleBackNavigation(swiper)
				}
			}

			// 이전 페이지 값을 현재 페이지로 업데이트
			previousPage.value = currentPage.value
		}

		// start 값이 변경될 때 currentItems 갱신
		watch(start, newStart => {
			let nextItems
			console.log('newStart', newStart)
			// 남은 페이지가 10개 미만일 때
			// if ((totalPaging.value - (currentPage.value + 10)) > 10) {
			// 	alert('1')
			// 	// 남은 아이템만 슬라이싱
			// 	nextItems = props.items.slice(newStart * checkGroupPaging, props.items.length);
			// } else {
			// 	alert('2')
			// 	// 기본 10개씩 아이템 로드
			// 	nextItems = props.items.slice(newStart * checkGroupPaging, (currentPage.value * 10) + 100);
			// }
			nextItems = props.items.slice(
				newStart * checkGroupPaging,
				currentPage.value * checkGroupPaging + checkGroupPaging * 10,
			)

			if (totalPaging.value >= currentPage.value && currentItems.value.length < props.items.length) {
				if (currentItems.length !== 0) {
					currentItems.value.push(...nextItems)
				}
			}

			// Display 값 갱신
			let startRange = newStart + 1
			let endRange = Math.min(startRange + 9, totalPaging.value) // 남은 페이지가 적으면 조정

			display.value = []
			for (let i = startRange - 1; i <= endRange; i++) {
				if (i !== 0 && i < totalPaging.value) {
					display.value.push(i)
				}
			}
		})

		// currentPage가 변경될 때마다 counting을 조정하는 watch
		watch(currentPage, newPage => {
			// counting 값을 현재 페이지에 가장 가까운 낮은 10의 배수로 조정
			const newCounting = Math.floor(newPage / 10) * 10

			// currentPage가 갑자기 커졌을 때 counting 값도 해당하는 10의 배수로 맞춤
			if (start.value !== newCounting) {
				start.value = newCounting
			}
		})

		const goToPage = index => {
			console.log('swiperRef.value', swiperRef)
			activePage.value = index
			if (swiperRef.value) {
				swiperRef.value.slideTo((index - 1) * 10) // 페이지 당 10개의 슬라이드 이동
			}
		}

		onMounted(() => {
			if (totalPaging.value > 10) {
				display.value = []
				for (let i = 1; i <= checkGroupPaging; i++) {
					display.value.push(i)
				}
			} else {
				display.value = []
				for (let i = 1; i <= totalPaging.value; i++) {
					display.value.push(i)
				}
			}
		})

		onUnmounted(() => {
			currentItems.value = []
			display.value = []
			activePage.value = 1
			start.value = 0
			previousPage.value = null
			totalPaging.value = 0
		})

		return {
			//
			previousPage,
			setSwiperRef,
			swiperRef,
			currentPage,
			start,
			totalPaging,
			currentItems,
			activePage,

			goToPage,
			display,
			//
			isPopupVisible,
			searchCarDetail,
			onSlideChange,
			pagination: {
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>'
				},
			},
			modules: [Navigation, Grid, Pagination, Scrollbar, A11y],
		}
	},
}
</script>

<style lang="scss" scoped>
.containerBox {
	position: relative;
	.arrow {
		background-color: #fff;
		color: white;
		padding: 0.97vw 1.33vw;
		border: none;
		cursor: pointer;
		box-shadow: 0px 0px 8px 0px #00000026;
		border-radius: 50%;
	}
	.arrowLeft {
		position: absolute;
		left: -5vw;
		top: 50%;
		transform: translateY(-50%);
	}
	.arrowRight {
		position: absolute;
		right: -5vw;
		top: 50%;
		transform: translateY(-50%);
	}
}

.swiper_inner {
	.swiper {
		width: 100%;
		height: 63vh;
		margin: 0 auto;
		:deep(.swiper-wrapper) {
			// width: 100%;
			// height: calc(60vh - 40px);
			// overflow: hidden !important;
			height: 62vh;

			.swiper-slide {
				display: flex;
				height: calc((100% - 40px) / 2) !important;
				margin-top: 20px !important;
				align-items: center;
				justify-content: center;
				background: rgba(253, 217, 140, 0.363);
				border: 1px solid #434a66;
				overflow: hidden;
			}
		}
	}
}
::v-deep .swiper-pagination {
	display: flex;
	justify-content: center;
}
::v-deep .swiper-pagination-bullet {
	text-align: center;
	line-height: 30px;
	font-weight: 500;
	color: #000;
	opacity: 1;
	background: rgba(0, 0, 0, 0.2);
	width: 1.57vw;
	height: 2.8vh;
	justify-content: center;
	display: flex;
	align-items: center;
	font-size: 0.8vw;
}

::v-deep .swiper-pagination-bullet-active {
	color: #fff;
	background: #0c7e60;
}

.custom-pagination {
	display: flex;
	justify-content: center;
}

.pagination-bullet {
	margin: 0 0.2vw;
	width: 1.5vw;
	height: 2.6vh;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	background-color: #ddd;
	border-radius: 50%;
	font-size: 0.75vw;
}

.pagination-bullet.active {
	background-color: #0c7e60;
	color: white;
}
</style>
