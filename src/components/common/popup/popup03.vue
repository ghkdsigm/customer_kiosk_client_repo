<!-- 자동차 검색/자동차 정보 탭 팝업 -->
<template>
	<div v-if="visible" class="fixed inset-0 flex items-center justify-center z-10">
		<div class="absolute inset-0 bg-gray-900 opacity-50"></div>
		<div class="bg-white flex shadow-lg p-0 w-[70vw] max-w-[70vw] h-[54.4vh] relative z-10 bottom-[3vh]">
			<!-- 자동차 기본정보 -->
			<div v-if="activeTabIndex === 0" class="w-full flex">
				<div class="w-full h-full">
					<div class="w-full h-full text-center flex flex-col items-center justify-center">
						<div class="w-full h-full max-w-[31.9vw] p-[2vw] flex flex-col justify-center items-center">
							<Slider02 :items="itemDetailImageKeys" />
						</div>
					</div>
				</div>
				<div class="w-full h-full">
					<div class="w-full h-full text-center flex flex-col items-center justify-center">
						<!-- <div class="w-full h-full p-[2vw] pl-[0] flex flex-col justify-center items-center">
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
						</div> -->
						<div class="w-[30vw] h-full pr-[2vw] py-[3.85vh] flex flex-col justify-between">
							<div>
								<table class="w-full border-collapse mb-[2vh]">
									<tbody>
										<tr class="border-t border-b border-gray-300 font-light text-[0.8vw]">
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">제조사</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">{{ itemDetailInfo?.makerName }}</td>
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">모델</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">{{ itemDetailInfo?.modelName }}</td>
										</tr>

										<tr class="border-t border-b border-gray-300 font-light text-[0.8vw]">
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">세부모델</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">{{ itemDetailInfo?.modelDetailName }}</td>
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">차량번호</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">{{ itemDetailInfo?.carNo }}</td>
										</tr>
									</tbody>
								</table>

								<table class="w-full border-collapse">
									<tbody>
										<tr class="border-t border-b border-gray-300 font-light text-[0.8vw]">
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">최초등록일</td>
											<td class="px-[0.85vw] py-[0.8vh] text-left">
												{{ registeredDate(itemDetailInfo?.regiYYMM) + ` (${itemDetailInfo?.regiYYYY})` }}
											</td>
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">차종</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">{{ itemDetailInfo?.useName }}</td>
										</tr>
										<tr class="border-t border-b border-gray-300 font-light text-[0.8vw]">
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">주행거리</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">
												{{ common_addComma(itemDetailInfo?.km) + 'km' }}
											</td>
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">연료</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">{{ itemDetailInfo?.gas }}</td>
										</tr>
										<tr class="border-t border-b border-gray-300 font-light text-[0.8vw]">
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">변속기</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">{{ itemDetailInfo?.autoGbn }}</td>
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">색상</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">{{ itemDetailInfo?.color }}</td>
										</tr>
										<tr class="border-t border-b border-gray-300 font-light text-[0.8vw]">
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">배기량</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">
												{{ common_addComma(itemDetailInfo?.numCC) + 'cc' }}
											</td>
											<td class="w-[19%] bg-[#F1F1F1] text-[#666666] py-[0.8vh]">사고유무</td>
											<td class="w-[31%] px-[0.85vw] py-[0.8vh] text-left">
												{{ itemDetailInfo?.noAccident === 'false' ? '무' : '유' }}
											</td>
										</tr>

										<tr class="border-t border-b border-gray-300 font-light text-[0.8vw]">
											<td class="w-[19%} bg-[#F1F1F1] text-[#666666] py-[5.8vh]">판매자한마디</td>
											<td class="px-[0.85vw] py-[0.8vh] text-left" colspan="3">
												<div class="border border-[#CCCCCC] h-[11vh] p-[0.5vw] rounded-[0.2vw]">
													{{ itemDetailInfo?.lineDemo }}
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="flex items-center items-center justify-between">
								<div class="flex items-center">
									<span class="text-[#262626] text-[1vw] px-[0.75vw] py-[0.5vh] border rounded-full mr-[1vw]"
										>판매가격</span
									><span class="h-full flex items-center text-[#1D3C6A] text-[1.2vw] font-medium"
										><em class="text-[2vw] not-italic font-semibold pr-[0.3vw]">{{
											common_addComma(itemDetailInfo?.demoAmt)
										}}</em
										>만원</span
									>
								</div>
								<!-- <a
									href="#"
									class="block w-[11.5vw] h-[2.65vw] rounded bg-[#00B0B9] px-3 py-2 font-semibold text-[0.9vw] text-white shadow-sm flex justify-center items-center"
								>
									<img
										src="@/assets/img/store/near_me.svg"
										alt="위치안내 아이콘 이미지"
										class="w-[1.4vw] h-[1.4vw] pr-[0.5vw] block z-10"
									/>위치안내</a
								> -->
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 자동차 차량옵션 -->
			<div v-if="activeTabIndex === 1" class="w-full flex">
				<div class="w-[61.5vw] h-full">
					<div class="w-full h-full text-center flex flex-col items-center justify-center">
						<div class="w-full h-full p-[2vw] flex flex-col justify-center items-center">
							<CarOptions :check-option="itemDetailInfo.opt" />
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
							<Slider03 :items="itemDetailImageUrls" />
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
			class="absolute bg-white flex items-center z-50 top-[75.5vh] justify-center text-gray-400 hover:text-gray-600 w-[2.7vw] h-[2.7vw] rounded-full"
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
import { defineComponent, ref, onMounted, computed } from 'vue'
import { searchPopTab } from '@/data/common.js'
import PerformanceCheck from '@/components/common/iframe/performancecheck.vue'
import CarOptions from '@/components/customerkiosk/searchcar/caroption.vue'
import { useUtilities } from '@/utils/useUtilities'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'

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
		itemDetail: {
			type: Object,
			default: null,
		},
	},
	components: {
		PerformanceCheck,
		CarOptions,
	},
	emits: ['confirm', 'cancel', 'update:visible'],
	setup(props, { emit }) {
		const { common_addComma } = useUtilities()
		const customerKioskStore = useCustomerKioskStore()
		const searchpopuptab = ref(searchPopTab)
		const activeTabIndex = ref(0)
		const issueNum = ref('24082610020')
		const imageUrlKey = ref('imageUrl')
		const imageUrlKeys = ref(['imageUrl1', 'imageUrl2', 'imageUrl3', 'imageUrl4', 'imageUrl5'])
		const imageUrls = ref([])
		const commonCode = ref([])

		const itemDetailImageKeys = computed(() => {
			return imageUrlKeys.value.map(key => {
				return props.itemDetail[key] || []
			})
		})
		const itemDetailInfo = computed(() => props.itemDetail)

		const itemDetailImageUrls = computed(() => {
			if (itemDetailInfo.value.length !== 0) {
				return Object.entries(itemDetailInfo.value)
					.filter(([key, val]) => key.includes(imageUrlKey.value) && val !== null && val !== '')
					.map(([_, val]) => val)
			}
		})

		const getBasicPic = arr => {
			return arr.slice(0, 4)
		}
		onMounted(async () => {
			const res = await customerKioskStore.fetchCommonCodeList('007')
			if (res) {
				commonCode.value = res
			}
		})

		const close = () => {
			activeTabIndex.value = 0
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

		const registeredDate = input => {
			const year = input.substring(0, 4)
			const month = input.substring(4, 6)

			return `${year}.${month}`
		}

		return {
			searchpopuptab,
			activeTabIndex,
			close,
			confirm,
			cancel,
			issueNum,
			itemDetailInfo,
			itemDetailImageKeys,
			itemDetailImageUrls,
			getBasicPic,
			imageUrls,
			common_addComma,
			commonCode,
			registeredDate,
		}
	},
})
</script>

<style scoped></style>
