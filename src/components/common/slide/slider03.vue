<!-- Vertical형 슬라이더 / 자동차 정보 -->
<template>
	<div class="swiper-container">
		<div class="w-[45vw] relative">
			<swiper
				:key="thumbsSwiper ? 'with-thumbs' : 'without-thumbs'"
				:style="{
					'--swiper-navigation-color': '#fff',
					'--swiper-pagination-color': '#fff',
				}"
				:loop="true"
				:spaceBetween="10"
				:navigation="{
					nextEl: '.arrowRight',
					prevEl: '.arrowLeft',
				}"
				:thumbs="thumbsSwiper ? { swiper: thumbsSwiper } : null"
				:modules="modules"
				class="mySwiper2"
			>
				<swiper-slide v-for="(item, idx) in items" :key="idx"
					><img :src="replaceUrlSegment(item, 'mpark_test', 'mpark')"
				/></swiper-slide>
				<!-- 추가 이미지들 -->
			</swiper>
			<button class="arrowLeft arrow z-10">
				<img src="@/assets/img/icn/slider_left.svg" alt="left" />
			</button>
			<button class="arrowRight arrow z-10">
				<img src="@/assets/img/icn/slider_right.svg" alt="right" />
			</button>
		</div>

		<swiper
			:key="'thumbnails'"
			@swiper="setThumbsSwiper"
			:loop="true"
			:spaceBetween="10"
			:navigation="{
				nextEl: '.arrowRight02',
				prevEl: '.arrowLeft02',
			}"
			:slidesPerView="3"
			:freeMode="false"
			:watchSlidesProgress="false"
			:modules="modules"
			:direction="'vertical'"
			class="mySwiper"
		>
			<swiper-slide v-for="(item, idx) in items" :key="idx" class="pl-[0vw]"
				><img :src="replaceUrlSegment(item, 'mpark_test', 'mpark')"
			/></swiper-slide>
			<!-- 추가 이미지들 -->
			<div class="verticalArrowWrap">
				<button class="arrowLeft02 arrow02 z-10">
					<img src="@/assets/img/icn/sliderTop.svg" alt="left" />
				</button>
				<button class="arrowRight02 arrow02 z-10">
					<img src="@/assets/img/icn/sliderBottom.svg" alt="right" />
				</button>
			</div>
		</swiper>
	</div>
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
	name: 'Slider03',
	props: { items: { type: Array, default: [] } },
	setup() {
		const thumbsSwiper = ref(null)

		const setThumbsSwiper = swiper => {
			console.log('??', swiper)
			thumbsSwiper.value = swiper
		}

		const replaceUrlSegment = (url, oldSegment, newSegment) => {
			return url.replace(oldSegment, newSegment)
		}

		return {
			thumbsSwiper,
			setThumbsSwiper,
			modules: [FreeMode, Navigation, Thumbs],
			replaceUrlSegment,
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
		left: 0vw;
		top: 50%;
		transform: translateY(-50%);
	}
	.arrowRight {
		position: absolute;
		right: 0vw;
		top: 50%;
		transform: translateY(-50%);
	}
	.verticalArrowWrap {
		background: #fff;
		height: 5vh;
		bottom: 0;
		position: absolute;
		z-index: 9999;
		width: 100%;
		display: flex;
		.arrow02 {
			background-color: #fff;
			color: white;
			width: 50%;
			text-align: center;
			border: none;
			cursor: pointer;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid #777777;
		}
		.arrowLeft02 {
			position: relative;
			left: 0vw;
			bottom: 0;
		}
		.arrowRight02 {
			position: relative;
			right: 0vw;
			bottom: 0;
		}
	}
}

.mySwiper2 {
	flex: 1;
	height: 100%;
	width: 80%; /* 이미지 슬라이드의 넓이 */
}

.mySwiper {
	flex: 0 0 19.2vh; /* 썸네일 슬라이드의 높이와 고정 넓이 설정 */
	width: 20%; /* 썸네일 슬라이드의 넓이 */
	height: 100%;
	box-sizing: border-box;
	padding: 10px 0;

	.swiper-slide {
		width: 100%; /* 세로 슬라이드의 넓이 */
		//height: calc(100% / 3); /* 세로 슬라이드의 높이를 3개로 나눔 */
		//height: 13vh !important;
		opacity: 0.4;

		&.swiper-slide-thumb-active {
			opacity: 1;
			border: 4px solid #00b0b9;
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
</style>
