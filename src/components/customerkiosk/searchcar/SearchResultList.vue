<template>
	<div class="containerBox">
		<div class="swiper_inner">
			<swiper
				:slides-per-view="5"
				:slides-per-group="5"
				:space-between="10"
				:pagination="pagination"
				:modules="modules"
				:navigation="{
					nextEl: '.arrowRight',
					prevEl: '.arrowLeft',
				}"
				:virtual="{ enabled: true, addSlidesBefore: 10, addSlidesAfter: 10 }"
				:loop="false"
				:loopFillGroupWithBlank="false"
				class="mySwiper"
			>
				<template v-if="originList.length > 5" v-for="(item, index) in originList">
					<swiper-slide v-if="index % 2 === 0" :key="index" class="flex justify-center items-center flex-col">
						<div class="grid grid-cols-2 gap-4">
							<!-- 2열 그리드 -->
							<div class="col-span-1">
								<SearchCarCard @click="searchCarDetail(item)" :item="item" />
							</div>
							<div class="col-span-1" v-if="originList[index + 1]">
								<SearchCarCard @click="searchCarDetail(originList[index + 1])" :item="originList[index + 1]" />
							</div>
						</div>
					</swiper-slide>
				</template>
				<template v-else>
					<swiper-slide v-for="(item, idx) in originList" :key="idx" class="flex justify-center items-center !h-fit">
						<SearchCarCard @click="searchCarDetail(item)" :item="item" />
					</swiper-slide>
				</template>
			</swiper>
		</div>

		<button class="arrowLeft arrow z-10">
			<img src="@/assets/img/icn/slider_left.svg" alt="left" />
		</button>
		<button class="arrowRight arrow z-10">
			<img src="@/assets/img/icn/slider_right.svg" alt="right" />
		</button>
	</div>
</template>
+
<script>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
// import required modules
import { Navigation, Pagination, Scrollbar, A11y, Virtual, Grid } from 'swiper/modules'
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

		//swiper
		const originList = computed(() => props.items)

		const searchCarDetail = e => {
			isPopupVisible.value = true
			console.log('check', e)
			emit('searchCarDetail', e)
		}

		onMounted(() => {})

		onUnmounted(() => {})

		return {
			//
			originList,
			//
			isPopupVisible,
			searchCarDetail,
			pagination: {
				clickable: true,
				dynamicBullets: true, // 현재 슬라이드 주변만 보여줌
				dynamicMainBullets: 8,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>'
				},
			},
			modules: [Navigation, Pagination, Scrollbar, A11y, Virtual, Grid],
		}
	},
}
</script>

<style lang="scss" scoped>
// .underFive {
// 	:deep(.swiper-wrapper) {
// 		.swiper-slide {
// 			height: auto !important;
// 		}
// 	}
// }
.containerBox {
	position: relative;
	margin: 1vw 0 0;
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

// .swiper_inner {
// 	.swiper {
// 		width: 100%;
// 		height: 63vh;
// 		margin: 0 auto;
// 		:deep(.swiper-wrapper) {
// 			// width: 100%;
// 			// height: calc(60vh - 40px);
// 			// overflow: hidden !important;
// 			// height: 62vh;
// 			// display: flex;
// 			// flex-wrap: wrap;
// 			height: 50%;
// 			.swiper-slide {
// 				display: flex;
// 				//height: calc((100% - 40px) / 2) !important;
// 				margin-top: 20px !important;
// 				align-items: center;
// 				justify-content: center;
// 				background: rgba(253, 217, 140, 0.363);
// 				border: 1px solid #434a66;
// 				overflow: hidden;
// 			}
// 		}
// 	}
// }
.mySwiper {
	/* Swiper 스타일 설정 */
	width: 100%;
	// height: 63vh;
	padding-bottom: 5vh;
}

.swiper-slide {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.grid {
	display: flex;
	flex-direction: column;
	gap: 10px; /* 간격 설정 */
}
// ::v-deep .swiper-pagination {
// 	display: flex;
// 	justify-content: center;
// }
// ::v-deep .swiper-pagination-bullet {
// 	text-align: center;
// 	line-height: 30px;
// 	font-weight: 500;
// 	color: #000;
// 	opacity: 1;
// 	background: rgba(0, 0, 0, 0.2);
// 	width: 1.57vw;
// 	height: 2.8vh;
// 	justify-content: center;
// 	display: flex;
// 	align-items: center;
// 	font-size: 0.8vw;
// }

::v-deep .swiper-pagination {
	font-size: 0.8vw;
	transform: scale(1);
}
::v-deep .swiper-pagination-bullet {
	width: 1.4vw;
	height: 1.4vw;
	transform: scale(1);
	color: #000 !important;
	background: rgba(0, 0, 0, 0.2);
	opacity: 1;
	line-height: 1.4vw;
	text-align: center;
}
::v-deep .swiper-pagination-bullet-active {
	color: #fff !important;
	background: #0c7e60;
}

// ::v-deep .swiper-pagination-bullet-active {
// 	color: #fff;
// 	background: #0c7e60;
// }

// .custom-pagination {
// 	display: flex;
// 	justify-content: center;
// }

// .pagination-bullet {
// 	margin: 0 0.2vw;
// 	width: 1.5vw;
// 	height: 2.6vh;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	cursor: pointer;
// 	background-color: #ddd;
// 	border-radius: 50%;
// 	font-size: 0.75vw;
// }

// .pagination-bullet.active {
// 	background-color: #0c7e60;
// 	color: white;
// }
</style>
