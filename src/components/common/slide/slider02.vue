<template>
	<swiper
		:key="thumbsSwiper ? 'with-thumbs' : 'without-thumbs'"
		:style="{
			'--swiper-navigation-color': '#fff',
			'--swiper-pagination-color': '#fff',
		}"
		:loop="true"
		:spaceBetween="10"
		:navigation="false"
		:thumbs="thumbsSwiper ? { swiper: thumbsSwiper } : null"
		:modules="modules"
		class="mySwiper2"
	>
		<swiper-slide><img src="@/assets/img/search/car01.png" /></swiper-slide>
		<swiper-slide><img src="@/assets/img/search/noImg.png" /></swiper-slide>
		<swiper-slide><img src="@/assets/img/search/noImg.png" /></swiper-slide>
		<swiper-slide><img src="@/assets/img/search/noImg.png" /></swiper-slide>
		<swiper-slide><img src="@/assets/img/search/noImg.png" /></swiper-slide>
		<swiper-slide><img src="@/assets/img/search/noImg.png" /></swiper-slide>
		<!-- 추가 이미지들 -->
	</swiper>

	<swiper
		:key="'thumbnails'"
		@swiper="setThumbsSwiper"
		:loop="true"
		:spaceBetween="10"
		:slidesPerView="3"
		:freeMode="true"
		:watchSlidesProgress="true"
		:modules="modules"
		class="mySwiper"
	>
		<swiper-slide><img src="@/assets/img/search/car01.png" /></swiper-slide>
		<swiper-slide><img src="@/assets/img/search/noImg.png" /></swiper-slide>
		<swiper-slide><img src="@/assets/img/search/noImg.png" /></swiper-slide>
		<swiper-slide><img src="@/assets/img/search/noImg.png" /></swiper-slide>
		<swiper-slide><img src="@/assets/img/search/noImg.png" /></swiper-slide>
		<swiper-slide><img src="@/assets/img/search/noImg.png" /></swiper-slide>
		<!-- 추가 이미지들 -->
	</swiper>
</template>

<script>
import { ref } from 'vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	name: 'Slider02',
	setup() {
		const thumbsSwiper = ref(null)

		const setThumbsSwiper = swiper => {
			console.log('??', swiper)
			thumbsSwiper.value = swiper
		}

		return {
			thumbsSwiper,
			setThumbsSwiper,
			modules: [FreeMode, Navigation, Thumbs],
		}
	},
}
</script>

<style lang="scss" scoped>
.swiper {
	width: 100%;
	height: 300px;
	margin-left: auto;
	margin-right: auto;

	&.mySwiper2 {
		height: 100%;
		width: 100%;
	}

	&.mySwiper {
		height: 19.2vh;
		box-sizing: border-box;
		padding: 10px 0;

		.swiper-slide {
			width: 25%;
			height: 100%;
			opacity: 0.4;

			&.swiper-slide-thumb-active {
				opacity: 1;
			}
		}
	}

	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;
		background-size: cover;
		background-position: center;

		display: flex;
		justify-content: center;
		align-items: center;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}
</style>
