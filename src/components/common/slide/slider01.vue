<!-- 뉴스 슬라이드 -->
<template>
	<div class="swiper-container">
		<!-- Slider -->
		<swiper
			:slides-per-view="1"
			:space-between="100"
			:modules="modules"
			:navigation="{
				nextEl: '.arrowRight',
				prevEl: '.arrowLeft',
			}"
			:pagination="pagination"
			@swiper="onSwiper"
			@slideChange="onSlideChange"
			class="mySwiper h-full"
		>
			<swiper-slide v-for="(item, idx) in items" :key="idx">
				<img
					:src="item.url ? item.url : '@/assets/img/news/example01.png'"
					:alt="item.title"
					class="h-5/6 block mx-auto"
				/>
			</swiper-slide>
		</swiper>
		<button class="arrowLeft arrow z-10">
			<img src="@/assets/img/icn/slider_left.svg" alt="left" />
		</button>
		<button class="arrowRight arrow z-10">
			<img src="@/assets/img/icn/slider_right.svg" alt="right" />
		</button>
	</div>
</template>

<script>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/grid'
import 'swiper/css/scrollbar'

export default {
	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},
	name: 'Slider01',
	components: {
		Swiper,
		SwiperSlide,
	},
	setup() {
		const onSwiper = swiper => {
			console.log(swiper)
		}
		const onSlideChange = () => {
			console.log('slide change')
		}
		const images = import.meta.glob('@/assets/img/news/*.png', { eager: true })
		const getImageSrc = img => {
			const fileName = `/src/assets/img/news/${img}.png`
			return images[fileName]?.default || images[fileName]
		}

		return {
			onSwiper,
			onSlideChange,
			getImageSrc,
			pagination: {
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>'
				},
			},
			modules: [Navigation, Pagination, Scrollbar, A11y],
		}
	},
}
</script>

<style lang="scss" scoped>
.swiper-container {
	display: flex;
	height: 100%;
	width: 100%;
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
		left: 3vw;
		top: 50%;
		transform: translateY(-50%);
	}
	.arrowRight {
		position: absolute;
		right: 3vw;
		top: 50%;
		transform: translateY(-50%);
	}
}
::v-deep .swiper-slide {
	text-align: center;
	font-size: 18px;
	background: #fff;

	/* Center slide text vertically */
	display: flex;
	justify-content: center;
	align-items: center;

	.swiper-slide img {
		display: block;
		object-fit: cover;
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
