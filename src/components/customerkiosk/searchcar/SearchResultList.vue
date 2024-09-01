<template>
	<div class="containerBox">
		<div class="swiper_inner h-[67vh]">
			<swiper
				:slidesPerView="5"
				:grid="{
					rows: 2,
				}"
				:space-between="100"
				:slides-per-group="10"
				:pagination="pagination"
				:modules="modules"
				:navigation="{
					nextEl: '.arrowRight',
					prevEl: '.arrowLeft',
				}"
				@slideChange="onSlideChange"
				class="mySwiper"
			>
				<swiper-slide v-for="(item, idx) in 120" :key="idx" class="flex justify-center items-center">
					<SearchCarCard @click="searchCarDetail(item)" />
				</swiper-slide>
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

<script>
import { computed, ref } from 'vue'
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
			type: Object,
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
		const results = [
			{ id: 1, name: 'Item 1' },
			{ id: 2, name: 'Item 2' },
			{ id: 3, name: 'Item 3' },
			{ id: 4, name: 'Item 4' },
		]

		// 검색어를 기준으로 결과 필터링
		// const filteredResults = computed(() =>
		// 	results.filter(item => item.name.toLowerCase().includes(props.query.toLowerCase())),
		// )
		const isPopupVisible = ref(false)

		const searchCarDetail = e => {
			isPopupVisible.value = true
			console.log('check', e)
			emit('searchCarDetail', e)
		}

		const onSlideChange = () => {
			console.log('slide change')
		}

		return {
			results,
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
		height: 68vh;
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
</style>
