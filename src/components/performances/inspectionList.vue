<template>
	<!-- Intro -->
	<div class="wrapper h-screen">
		<div class="header relative w-[100%] h-[30vh]">
			<div class="bg absolute top-[0%] left-[50%]"></div>

			<div class="flex flex-col justify-center py-[4vh]">
				<img src="../../assets/img/pin.svg" class="w-[100%] h-[4.5vh]" />
				<p class="title text-center mb-[1.5vh]">
					엠파크 <strong>{{ danjiName }} 성능점검장</strong>
				</p>

				<div class="count text-center py-[1.2vh] px-[2vw]">
					<div class="flex flex-row justify-center items-center">
						<span class="mr-[2vw]">검사중 차량</span>
						<span class="num"
							><strong class="text-[#1bf9a2]">{{ inspectionList.length }}</strong
							>대</span
						>
					</div>
				</div>
			</div>
		</div>

		<div class="inner">
			<swiper
				:slidesPerView="5"
				:slidesPerGroup="5"
				:spaceBetween="30"
				:autoplay="{
					delay: 5000,
					disableOnInteraction: false,
				}"
				:modules="modules"
				class="mySwiper"
				:loop="isLoop"
				:touchRatio="0"
				@reachEnd="slideEnd"
			>
				<swiper-slide v-for="(emp, idx) in inspectionList" :key="idx"
					><PerformancesEmployeeCard :empInfo="emp"
				/></swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script setup>
import PerformancesEmployeeCard from '@/components/performances/employeeCard.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/grid'

// import required modules
import { Autoplay } from 'swiper/modules'

import { defineProps, defineEmits, onMounted } from 'vue'
const modules = [Autoplay]
const props = defineProps({
	inspectionList: {
		type: Array,
		default: [],
	},
	danjiName: {
		type: String,
		default: () => '',
	},
})

const emit = defineEmits(['changeSlide'])

const emitFunc = () => {
	setTimeout(() => {
		emit('changeSlide')
	}, 5000)
}

const slideEnd = e => {
	e.autoplay.stop()
	if (isLoop) emitFunc()
}

const isLoop = !(props.inspectionList.length < 6)

onMounted(() => {
	// 슬라이드 없을시 settimeout 설정
	if (!isLoop) emitFunc()
})
</script>

<style lang="scss" scoped>
.header {
	background-color: #1f2733;
	.bg {
		width: 28vw;
		height: 26vh;
		background: linear-gradient(180deg, #c324c7 0%, #66fbfb 100%);
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		opacity: 0.7;
		transform: translateX(-50%);
		filter: blur(300px);
		border-radius: 727px;
	}
	.title {
		font-size: 3.5vh;
		color: #fff;
	}
	.count {
		width: 15.2vw;
		margin: 0 auto;
		font-size: 1.8vh;
		color: #fff;
		background-color: #434a66;
		box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.15);
		border-radius: 99px;
		line-height: 1;
		.num {
			font-size: 3vh;
		}
	}
}

.inner {
	width: 87vw;
	margin: -5vh auto 0;
}

.swiper {
	width: 100%;
	height: 100%;
}

.swiper-slide {
	text-align: center;
	box-shadow: 10px 15px 25px 0px rgba(0, 0, 0, 0.15);
}
</style>
