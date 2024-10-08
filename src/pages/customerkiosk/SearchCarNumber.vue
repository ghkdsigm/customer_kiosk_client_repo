<template>
	<div class="mb-[3vh] tit_bar">
		<h1 class="tit">{{ titleEN }}</h1>
	</div>
	<div
		class="flex w-full h-[75vh] bg-white border border-gray-300 rounded-md shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)]"
	>
		<div class="flex flex-col w-full h-full">
			<div class="flex flex-col h-1/4 justify-center items-center">
				<p class="text-[2vw] font-bold">차량번호 검색</p>
				<p class="text-[#777777] text-[1vw] font-normal">
					엠파크 전시장에 전시되어 있는 차량번호 숫자 네자리를 입력하시면 차량상세정보를 확인할 수 있습니다
				</p>
			</div>
			<div class="flex flex-1 h-3/4 px-[4vw] pb-[6vh]">
				<div class="flex flex-col w-1/2 justify-center items-start mx-[1vw]">
					<h4 class="text-[1.3vw] font-normal">전시된 차량번호를 입력해 주세요</h4>
					<hr class="w-full h-[1px] bg-[#9E9E9E] mt-[2vh] mb-[3vh]" />
					<div class="grid grid-cols-4 gap-6 w-full">
						<span
							v-for="(digit, index) in digits"
							:key="index"
							class="rounded-lg bg-[#F0F0F0] h-[13vh] shadow-[0px_1px_0px_0px_#00000059] flex justify-center items-center"
							><b class="text-[#262626] text-[2.6vw]">{{ digit }}</b></span
						>
					</div>
				</div>
				<div class="flex w-1/2 justify-center items-center mx-[1vw]">
					<div class="rounded-lg bg-[#F0F0F0] w-full h-full p-[3vw] flex gap-8">
						<div class="w-[21vw]">
							<div class="grid grid-cols-3 gap-4 h-full">
								<!-- 1, 2, 3 -->
								<button
									v-for="number in [1, 2, 3]"
									:key="number"
									@click="inputDigit(number)"
									class="keyButton w-full h-full flex items-center justify-center bg-white text-[#262626] text-[1.5vw] font-semibold rounded-md hover:bg-gray-50 shadow-[0px_1px_0px_0px_#00000059]"
								>
									{{ number }}
								</button>

								<!-- 4, 5, 6 -->
								<button
									v-for="number in [4, 5, 6]"
									:key="number"
									@click="inputDigit(number)"
									class="keyButton w-full h-full flex items-center justify-center bg-white text-[#262626] text-[1.5vw] font-semibold rounded-md hover:bg-gray-50 shadow-[0px_1px_0px_0px_#00000059]"
								>
									{{ number }}
								</button>

								<!-- 7, 8, 9 -->
								<button
									v-for="number in [7, 8, 9]"
									:key="number"
									@click="inputDigit(number)"
									v-touch-click
									class="keyButton w-full h-full flex items-center justify-center bg-white text-[#262626] text-[1.5vw] font-semibold rounded-md hover:bg-gray-50 shadow-[0px_1px_0px_0px_#00000059]"
								>
									{{ number }}
								</button>

								<!-- Del, 0, Reset -->
								<button
									@click="deleteDigit"
									v-touch-click
									class="keyButton w-full h-full flex items-center justify-center bg-[#E4E4E4] text-[#262626] text-[1.2vw] font-semibold rounded-md shadow-[0px_1px_0px_0px_#00000059]"
								>
									<img src="@/assets/img/keypad/arrow_back.svg" alt="back arrow" />
								</button>
								<button
									@click="inputDigit(0)"
									v-touch-click
									class="keyButton w-full h-full flex items-center justify-center bg-white text-[#262626] text-[1.5vw] font-semibold rounded-md hover:bg-gray-50 shadow-[0px_1px_0px_0px_#00000059]"
								>
									0
								</button>
								<button
									@click="resetDigits"
									v-touch-click
									class="keyButton w-full h-full flex items-center justify-center bg-[#E4E4E4] text-[#262626] text-[1.2vw] font-semibold rounded-md shadow-[0px_1px_0px_0px_#00000059]"
								>
									초기화
								</button>
							</div>
						</div>
						<div class="w-[10vw]">
							<div class="flex flex-col space-y-4 h-full">
								<button
									@click="deleteDigit"
									v-touch-click
									class="keyButton w-full h-[18vh] bg-[#E4E4E4] text-[#262626] font-semibold text-[1.2vw] rounded-md shadow-[0px_1px_0px_0px_#00000059] justify-center items-center flex"
								>
									<img src="@/assets/img/keypad/arrow_back.svg" alt="back arrow" />
								</button>
								<button
									@click="resetDigits"
									v-touch-click
									class="keyButton w-full h-[18vh] bg-[#434A66] text-white font-semibold text-[1.2vw] rounded-md shadow-[0px_1px_0px_0px_#00000059]"
								>
									초기화
								</button>
								<button
									@click="searchCarNumber(parseDigit(digits))"
									v-touch-click
									:disabled="digits.includes('') || digits.length !== 4"
									class="keyButton w-full h-full bg-[#00B0B9] text-white font-semibold text-[1.2vw] rounded-md disabled:opacity-50 shadow-[0px_1px_0px_0px_#00000059]"
								>
									검색
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Popup01
		v-model:visible="isPopupVisible"
		title="재검색"
		confirmText="다시 검색하기"
		ico="replay.svg"
		@confirm="handleConfirm"
		@cancel="handleCancel"
	>
		<template #content>
			<p>{{ target }}</p>
			<p>다시 검색해주세요.</p>
		</template>
	</Popup01>
	<div v-if="listLoading">
		<CarLoading />
	</div>
	<!-- <Popup02
		v-model:visible="isPopupVisible"
		title="팝업 제목"
		confirmText="확인"
		cancelText="취소"
		@confirm="handleConfirm"
		@cancel="handleCancel"
	>
		<template #content>
			<p>팝업내용.</p>
		</template>
	</Popup01> -->
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import { useRouter } from 'vue-router'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'

export default defineComponent({
	name: 'CustomerkioskSearchCarNumber',
	setup(_, { emit }) {
		const { titleEN } = useTitleEN()
		const router = useRouter()
		const pageType = ref('1')
		const customerKioskStore = useCustomerKioskStore()

		const digits = ref(['', '', '', ''])
		const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])

		//공통팝업용
		const isPopupVisible = ref(false)
		const target = ref(null)
		const listLoading = ref(false)

		const inputDigit = digit => {
			const index = digits.value.indexOf('')
			if (index !== -1) {
				digits.value[index] = digit
			}
		}

		const deleteDigit = () => {
			const lastFilledIndex = digits.value.map(digit => digit !== '').lastIndexOf(true)
			if (lastFilledIndex !== -1) {
				digits.value[lastFilledIndex] = ''
			}
		}

		const searchCarNumber = async digits => {
			try {
				listLoading.value = true
				if (digits.length === 4) {
					//emit('search', digits.value.join(''))
					//alert('차량번호가 존재하지않습니다.')
					console.log('digitsdigitsdigits', digits)
					//isPopupVisible.value = true

					const params = {
						keyWord: digits,
					}

					const res = await customerKioskStore.fetchCarList(params)
					console.log('resresresresz', res)
					if (res.length === 0) {
						isPopupVisible.value = true
						openPop('차량')
					} else {
						const query = params
						router.push({
							name: 'carsearchresults',
							params: '1',
							query,
						})
					}

					resetDigits()
				} else {
					alert('차량번호 4자리를 입력하세요.')
					resetDigits()
				}
			} catch (error) {
			} finally {
				listLoading.value = false
			}
		}

		const parseDigit = digit => {
			return digit.join('')
		}

		const openPop = val => {
			if (val === '딜러') {
				target.value = '딜러 검색 결과가 없습니다.'
			} else if (val === '차량') {
				target.value = '차량 검색 결과가 없습니다.'
			} else {
				target.value = '2글자 이상 입력해주세요.'
			}
			isPopupVisible.value = true
		}

		//공통팝업용
		const handleConfirm = () => {
			console.log('확인 버튼이 클릭되었습니다.')
			isPopupVisible.value = false // 팝업 닫기
		}
		//공통팝업용
		const handleCancel = () => {
			console.log('취소 버튼이 클릭되었습니다.')
			isPopupVisible.value = false // 팝업 닫기
		}

		const resetDigits = () => {
			digits.value = ['', '', '', '']
		}

		return {
			titleEN,
			router,
			pageType,
			digits,
			numbers,
			inputDigit,
			deleteDigit,
			resetDigits,
			isPopupVisible,
			searchCarNumber,
			handleConfirm,
			handleCancel,
			parseDigit,
			target,
			openPop,
			listLoading,
		}
	},
})
</script>

<style scoped>
.tit_bar {
	display: flex;
	justify-content: space-between;
}
.keyButton {
	&:active {
		transform: scale(0.95);
	}
}
</style>
