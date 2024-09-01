<!-- 슬라이드형 팝업 -->
<template>
	<div v-if="visible" class="fixed inset-0 flex items-center justify-center z-10">
		<div class="absolute inset-0 bg-gray-900 opacity-50"></div>
		<div class="bg-white flex rounded-lg shadow-lg p-0 w-[62.5vw] max-w-[62.5vw] h-[50.36vh] relative z-10">
			<!-- Swiper 슬라이더 전체 팝업을 슬라이드로 구현 -->
			<swiper
				:slides-per-view="1"
				class="w-full h-full mySwiper"
				:modules="modules"
				:navigation="{
					nextEl: '.arrowRight',
					prevEl: '.arrowLeft',
				}"
			>
				<swiper-slide>
					<!-- 첫 번째 팝업 내용 -->
					<div class="flex w-full h-full">
						<div class="w-3/5 h-full bg-gray-200">
							<img
								src="@/assets/img/store/storeTestImg.png"
								alt="스토어 테스트 이미지 1"
								class="w-full h-full block z-10"
							/>
						</div>
						<div class="w-2/5 h-full">
							<div class="-w-full h-full text-center flex flex-col items-center justify-center">
								<div class="w-full h-full p-[2vw] flex flex-col justify-center items-center">
									<p
										class="text-[0.5w] text-[#00B0B9] py-[0.3vw] px-[0.8vw] rounded-full border border-[#00B0B9] font-normal"
									>
										STORE
									</p>
									<h3 class="mb-[1.6vw] text-[1.6vw]">브이아이피 광택</h3>
									<div class="w-full bg-[#F8F8F8] p-[2vw] rounded-sm">
										<ul class="leading-[2.1vw]">
											<li class="flex text-[0.9vw]">
												<span class="font-bold pr-[2vw]">매장위치</span>
												<span class="font-normal">1F</span>
											</li>
											<li class="flex text-[0.9vw]">
												<span class="font-bold pr-[2vw]">전화번호</span>
												<span class="font-normal">010-1234-1234</span>
											</li>
										</ul>
									</div>
									<a
										href="#"
										class="mt-[1.6vw] block w-[11.5vw] h-[2.65vw] rounded bg-[#00B0B9] px-3 py-2 font-semibold text-[0.9vw] text-white shadow-sm flex justify-center items-center"
										><img
											src="@/assets/img/store/near_me.svg"
											alt="위치안내 아이콘 이미지"
											class="w-[1.4vw] h-[1.4vw] pr-[0.5vw] block z-10"
										/>위치안내</a
									>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>

				<swiper-slide>
					<!-- 두 번째 팝업 내용 -->
					<div class="flex w-full h-full">
						<div class="w-3/5 h-full bg-gray-200">
							<img
								src="@/assets/img/store/storeTestImg.png"
								alt="스토어 테스트 이미지 2"
								class="w-full h-full block z-10"
							/>
						</div>
						<div class="w-2/5 h-full">
							<div class="-w-full h-full text-center flex flex-col items-center justify-center">
								<div class="w-full h-full p-[2vw] flex flex-col justify-center items-center">
									<p
										class="text-[0.5w] text-[#00B0B9] py-[0.3vw] px-[0.8vw] rounded-full border border-[#00B0B9] font-normal"
									>
										STORE
									</p>
									<h3 class="mb-[1.6vw] text-[1.6vw]">VIP 카 서비스</h3>
									<div class="w-full bg-[#F8F8F8] p-[2vw] rounded-sm">
										<ul class="leading-[2.1vw]">
											<li class="flex text-[0.9vw]">
												<span class="font-bold pr-[2vw]">매장위치</span>
												<span class="font-normal">2F</span>
											</li>
											<li class="flex text-[0.9vw]">
												<span class="font-bold pr-[2vw]">전화번호</span>
												<span class="font-normal">010-9876-5432</span>
											</li>
										</ul>
									</div>
									<a
										href="#"
										class="mt-[1.6vw] block w-[11.5vw] h-[2.65vw] rounded bg-[#00B0B9] px-3 py-2 font-semibold text-[0.9vw] text-white shadow-sm flex justify-center items-center"
										><img
											src="@/assets/img/store/near_me.svg"
											alt="위치안내 아이콘 이미지"
											class="w-[1.4vw] h-[1.4vw] pr-[0.5vw] block z-10"
										/>위치안내</a
									>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<!-- 닫기 버튼 -->
		<button
			@click="close"
			class="absolute bg-white flex items-center z-50 top-[78vh] justify-center text-gray-400 hover:text-gray-600 w-[2.7vw] h-[2.7vw] rounded-full"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1"
				stroke="currentColor"
				class="w-[2.3vw] h-[2.3vw]"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
		<button class="arrowLeft arrow z-10">
			<img src="@/assets/img/icn/slider_left.svg" alt="left" />
		</button>
		<button class="arrowRight arrow z-10">
			<img src="@/assets/img/icn/slider_right.svg" alt="right" />
		</button>
	</div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import { Navigation, Grid, Pagination } from 'swiper/modules'

export default defineComponent({
	name: 'Popup05',
	components: {
		Swiper,
		SwiperSlide,
	},
	props: {
		title: {
			type: String,
			default: 'Popup Title',
		},
		confirmText: {
			type: String,
			default: '확인',
		},
		cancelText: {
			type: String,
			default: '취소',
		},
		visible: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['confirm', 'cancel', 'update:visible'],
	setup(props, { emit }) {
		const { title, confirmText, cancelText, visible } = toRefs(props)

		const close = () => {
			emit('update:visible', false)
		}

		const confirm = () => {
			emit('confirm')
			close()
		}

		const cancel = () => {
			emit('cancel')
			close()
		}

		return {
			title,
			confirmText,
			cancelText,
			visible,
			close,
			confirm,
			cancel,
			modules: [Navigation, Grid, Pagination],
		}
	},
})
</script>

<style lang="scss" scoped>
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
	left: 10vw;
	top: 50%;
	transform: translateY(-50%);
}
.arrowRight {
	position: absolute;
	right: 10vw;
	top: 50%;
	transform: translateY(-50%);
}
</style>
