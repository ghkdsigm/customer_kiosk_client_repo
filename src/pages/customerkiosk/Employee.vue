<template>
	<div>
		<div class="tit_bar">
			<h1 class="tit">{{ titleEN }}</h1>
			<button type="button" class="btn_research" @click="keyboardShow">
				<img src="/src/assets/img/icn/replay.svg" aria-hidden />
				다시검색하기
			</button>
		</div>

		<div class="swiper_inner inner text-[1.05vw]">
			<p class="font-medium text-[1.05vw]  mb-[1.2vw]">검색하신 딜러는 <span class="text-[#00B0B9]">총 8명</span> 입니다.</p>
			<swiper
				:slidesPerView="'5'"
				:spaceBetween="20"
				:slides-per-group="10"
				:pagination="pagination"
				:navigation="{
					nextEl: '.arrowRight',
					prevEl: '.arrowLeft',
				}"
				:modules="modules"
				class="mySwiper"
			>
				<swiper-slide v-for="(item, idx) in 45" :key="idx"><EmployeeCard /></swiper-slide>
			</swiper>
			<button class="arrowLeft arrow z-10">
				<img src="@/assets/img/icn/slider_left.svg" alt="left" />
			</button>
			<button class="arrowRight arrow z-10">
				<img src="@/assets/img/icn/slider_right.svg" alt="right" />
			</button>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import { useMparkStore } from '@/store/mpark'
import EmployeeCard from '@/components/customerkiosk/employee/card.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import 'swiper/css/pagination'

// import required modules
import { Navigation, Grid, Pagination } from 'swiper/modules'

export default defineComponent({
	name: 'CustomerkioskEmployee',
	components: {
		Swiper,
		SwiperSlide,
		EmployeeCard,
	},

	setup() {
		const { titleEN } = useTitleEN()
		const mparkStore = useMparkStore()

		const keyboardShow = () => {
			mparkStore.setKeyBoardUse(true)
		}

		return {
			titleEN,
			keyboardShow,
			modules: [Navigation, Grid, Pagination],
			pagination: {
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>'
				},
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.tit_bar {
	display: flex;
	justify-content: space-between;

	.btn_research {
		display: flex;
		padding: 0.7vh 0.8vw;
		justify-content: center;
		align-items: center;
		color: #555;
		font-size: 1.2vh;
		background-color: #fff;
		border-radius: 4px;
		border: 1px solid #ccc;
		img {
			margin-right: 0.3vw;
		}
	}
}

.inner {
	padding: 0 8vw;
	position: absolute;
	width: 100%;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
}

.result {
	margin-bottom: 2vh;
	font-size: 1.2vh;
	font-weight: 500;
	.count {
		color: #00b0b9;
	}
}

.swiper_inner {
	.swiper {
		width: 100%;
		height: 58vh;
		margin: 0 auto;
		:deep(.swiper-wrapper) {
			width: 100%;
			height: 50vh;
			.swiper-slide {
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgba(253, 217, 140, 0.363);
			}
		}

		// :deep(.swiper-button-prev) {
		// 	left: -4vw;
		// }
		// :deep(.swiper-button-next) {
		// 	right: -4vw;
		// }
	}
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

::v-deep .swiper-pagination {
	display: flex;
	justify-content: center;
	bottom: 0vh;
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
