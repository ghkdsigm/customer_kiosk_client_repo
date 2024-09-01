<template>
	<div>
		<h1 class="mb-[3vh] tit">{{ titleEN }}</h1>

		<div class="swiper_inner">
			<swiper
				:slidesPerView="5"
				:grid="{
					rows: 2,
				}"
				:spaceBetween="50"
				:slides-per-group="10"
				:pagination="pagination"
				:navigation="{
					nextEl: '.arrowRight',
					prevEl: '.arrowLeft',
				}"
				:modules="modules"
				class="mySwiper"
			>
				<swiper-slide v-for="(item, idx) in 144" :key="idx"><StoreCard /></swiper-slide>
			</swiper>
			<button class="arrowLeft arrow z-10">
				<img src="@/assets/img/icn/slider_left.svg" alt="left" />
			</button>
			<button class="arrowRight arrow z-10">
				<img src="@/assets/img/icn/slider_right.svg" alt="right" />
			</button>
		</div>

		<div class="keypad">
			<div class="category">
				<div class="inner">
					<button
						v-for="(option, index) in options"
						:key="index"
						type="button"
						class="text-[0.85vw] px-2 py-1 rounded-lg transition-colors duration-200"
						:class="{
						'bg-[#0c7e60] text-white': selectedCategory === option,
						'bg-[#9e9e9e] text-white': selectedCategory !== option,
						}"
						@click="selectCategory(option)"
					>
						{{ option }}
					</button>
				</div>
			</div>
			<div class="pad">
				<div class="inner">
					<!-- <div class="left"></div>
					<div class="right"></div> -->
					<StoreKeypad />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import StoreCard from '@/components/customerkiosk/store/card.vue'
import StoreKeypad from '@/components/customerkiosk/store/keypad.vue'

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
	name: 'CustomerkioskStore',
	components: {
		Swiper,
		SwiperSlide,
		StoreCard,
		StoreKeypad,
	},
	setup() {
		const { titleEN } = useTitleEN()

		// 카테고리 목록
		const options = [
			'전체',
			'매매상사',
			'지원시설',
			'매점',
			'음식점',
			'정비/세차/광택',
			'금융(캐피탈)/보험',
			'신차영업소'
		]
		// 선택된 카테고리 저장
		const selectedCategory = ref(options[0])

		const selectCategory = (option) => {
			selectedCategory.value = option
		}



		return {
			titleEN,
			options,
			selectedCategory,
			selectCategory,
			pagination: {
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>'
				},
			},
			modules: [Navigation, Grid, Pagination],
		}
	},
})
</script>

<style lang="scss" scoped>
.swiper_inner {
	padding: 0 7vw;

	.swiper {
		width: 100%;
		height: 61vh;
		margin: 0 auto;
		:deep(.swiper-wrapper) {
			// width: 100%;
			// height: 62vh;
			// overflow: hidden !important;

			.swiper-slide {
				display: flex;
				height: 26vh !important;
				//height: calc((100% - 40px) / 2) !important;
				margin-top: 20px !important;
				align-items: center;
				justify-content: center;
				background: rgba(253, 217, 140, 0.363);
			}
		}
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
	bottom: 1vh;
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

.keypad {
	position: fixed;
	left: 0;
	bottom: 10vh;
	width: calc(100% - 7.7vw);
	background-color: #f0f0f0;
	.inner {
		width: 64.6vw;
		margin: 0 auto;
	}
	.category {
		padding: 1.2vh 0;
		border-bottom: 1px solid #d4d4d4;
		.inner {
			display: grid;
			grid-template-columns: repeat(8, 1fr);
			column-gap: 20px;
		}
		button {
			padding: 0.8vh 0;
			//color: #fff;
			border-radius: 4px;
			//background-color: #9e9e9e;
		}
	}
	.pad {
		padding: 1.2vh 0;
	}
}
</style>
