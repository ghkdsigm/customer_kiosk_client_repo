<!-- 자동차 검색/자동차 정보 탭 팝업 -->
<template>
	<div v-if="visible" class="fixed inset-0 flex items-center justify-center z-10">
		<div class="absolute inset-0 bg-gray-900 opacity-50"></div>
		<div class="bg-white flex shadow-lg p-0 w-[70vw] max-w-[70vw] h-[54.4vh] relative z-10">
			<!-- 자동차 기본정보 -->
			<div v-if="activeTabIndex === 0" class="w-full flex">
				<div class="w-[30.25vw] h-full">
					<div class="w-full h-full text-center flex flex-col items-center justify-center">
						<div class="w-full h-full p-[2vw] flex flex-col justify-center items-center">
							<Slider02 />
						</div>
					</div>
				</div>
				<div class="w-full h-full">
					<div class="w-full h-full text-center flex flex-col items-center justify-center">
						<div class="w-full h-full p-[2vw] pl-[0] flex flex-col justify-center items-center">
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
							>
								<img
									src="@/assets/img/store/near_me.svg"
									alt="위치안내 아이콘 이미지"
									class="w-[1.4vw] h-[1.4vw] pr-[0.5vw] block z-10"
								/>위치안내</a
							>
						</div>
					</div>
				</div>
			</div>
			<!-- 자동차 차량옵션 -->
			<div v-if="activeTabIndex === 1" class="w-full flex">
				<div class="w-[61.5vw] h-full">
					<div class="w-full h-full text-center flex flex-col items-center justify-center">
						<div class="w-full h-full p-[2vw] flex flex-col justify-center items-center">
							<CarOptions />
						</div>
					</div>
				</div>
			</div>
			<!-- 성능/상태 기록부 -->
			<div v-if="activeTabIndex === 2" class="w-full flex">
				<div class="w-[61.5vw] h-full">
					<div class="w-full h-full text-center flex flex-col items-center justify-center">
						<div class="w-full h-full p-[2vw] flex flex-col justify-center items-center">
							<PerformanceCheck :issueNum="issueNum" />
						</div>
					</div>
				</div>
			</div>
			<!-- 차량사진 더보기 -->
			<div v-if="activeTabIndex === 3" class="w-full flex">
				<div class="w-[61.5vw] h-full">
					<div class="w-full h-full text-center flex flex-col items-center justify-center">
						<div class="w-full h-full p-[2vw] flex flex-col justify-center items-center">
							<Slider03 />
						</div>
					</div>
				</div>
			</div>

			<!-- 차량검색 탭 -->
			<div class="w-[9.5vw] h-full bg-gray-300 flex flex-col">
				<div class="h-full w-full" v-for="(item, idx) in searchpopuptab" :key="idx">
					<button
						@click="activeTabIndex = idx"
						:class="[
							'w-full h-full flex items-center justify-center whitespace-pre-line font-medium text-[1.1vw] leading-[2.4vh]',
							activeTabIndex === idx ? 'bg-[#0C7E60] text-white' : 'bg-[#F8F8F8] hover:bg-[#0C7E60] hover:text-white',
						]"
					>
						{{ item.title }}
					</button>
				</div>
			</div>
		</div>
		<!-- Close button -->
		<button
			@click="close"
			class="absolute bg-white flex items-center z-50 top-[80vh] justify-center text-gray-400 hover:text-gray-600 w-[2.7vw] h-[2.7vw] rounded-full"
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
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { searchPopTab } from '@/data/common.js'
import PerformanceCheck from '@/components/common/iframe/performancecheck.vue'
import CarOptions from '@/components/customerkiosk/searchcar/caroption.vue'

export default defineComponent({
	name: 'Popup03',
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
	components: {
		PerformanceCheck,
		CarOptions,
	},
	emits: ['confirm', 'cancel', 'update:visible'],
	setup(props, { emit }) {
		const searchpopuptab = ref(searchPopTab)
		const activeTabIndex = ref(0)
		const issueNum = ref('24082610020')

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
			searchpopuptab,
			activeTabIndex,
			close,
			confirm,
			cancel,
			issueNum,
		}
	},
})
</script>

<style scoped>
</style>
