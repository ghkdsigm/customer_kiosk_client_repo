<template>
	<!-- Intro -->
	<div class="wrapper h-screen">
		<div class="header relative w-[100%] h-[30vh]">
			<div class="bg absolute top-[0%] left-[50%]"></div>

			<div class="flex flex-col justify-center py-[4vh]">
				<img src="../../assets/img/pin.svg" class="w-[100%] h-[4.5vh]" />
				<p class="title text-center mb-[1.5vh]">엠파크 <strong>허브 성능점검장</strong></p>

				<div class="count text-center py-[1.2vh] px-[2vw]">
					<div class="flex flex-row justify-center items-center">
						<span class="mr-[2vw]">접수 대기 차량</span>
						<span class="num"><strong class="text-[#1bf9a2]">34</strong>대</span>
					</div>
				</div>
			</div>
		</div>

		<div class="inner">
			<swiper
				:slidesPerView="5"
				:spaceBetween="30"
				:autoplay="{
					delay: 1000,
					disableOnInteraction: false,
				}"
				:modules="modules"
				class="mySwiper"
			>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
				<swiper-slide><PerformancesEmployeeCard /></swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
import PerformancesEmployeeCard from '@/components/performances/employeeCard.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/grid'

// import required modules
import { Autoplay } from 'swiper/modules'

export default {
	name: 'PerformancestatusIntro',
	components: {
		Swiper,
		SwiperSlide,
		PerformancesEmployeeCard,
	},
	setup() {
		return {
			modules: [Autoplay],
		}
	},
}
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
		width: 15vw;
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
