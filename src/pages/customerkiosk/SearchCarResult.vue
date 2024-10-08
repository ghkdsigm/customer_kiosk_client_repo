<template>
	<div class="mb-[3vh] tit_bar">
		<h1 class="tit">{{ titleEN }}</h1>
		<button type="button" class="btn_research" @click="keyboardShow">
			<img src="/src/assets/img/icn/replay.svg" aria-hidden />
			다시검색하기
		</button>
	</div>
	<div
		class="flex flex-col w-full h-[75vh] px-[6.3vw] bg-white border border-gray-300 rounded-md shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)]"
	>
		<div class="w-full flex justify-between items-end">
			<p class="font-medium text-[1.05vw]">
				검색하신 차량은 <span class="text-[#00B0B9]">총 {{ allCars }}대</span> 입니다.
			</p>
			<div
				class="relative z-0 flex border overflow-hidden border-[#00B0B9] mt-[1.2vw]"
				aria-label="Tabs"
				role="tablist"
				aria-orientation="horizontal"
			>
				<button
					type="button"
					class="text-[0.8vw] min-w-0 py-[0.5vw] px-[1.6vw] hover:text-gray-700 font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-white focus:bg-[#00B0B9] disabled:opacity-50 disabled:pointer-events-none active"
					:class="checkItems === 0 ? 'bg-[#00B0B9] text-white' : 'bg-white text-gray-500'"
					@click="checkItemsSel(0)"
				>
					추천순
				</button>
				<button
					type="button"
					class="text-[0.8vw] min-w-0 py-[0.5vw] px-[1.6vw] hover:text-gray-700 font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-white focus:bg-[#00B0B9] disabled:opacity-50 disabled:pointer-events-none"
					:class="checkItems === 1 ? 'bg-[#00B0B9] text-white' : 'bg-white text-gray-500'"
					@click="checkItemsSel(1)"
				>
					가격순
				</button>
				<button
					type="button"
					class="text-[0.8vw] min-w-0 py-[0.5vw] px-[1.6vw] hover:text-gray-700 font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-white focus:bg-[#00B0B9] disabled:opacity-50 disabled:pointer-events-none"
					:class="checkItems === 2 ? 'bg-[#00B0B9] text-white' : 'bg-white text-gray-500'"
					@click="checkItemsSel(2)"
				>
					연식순
				</button>
			</div>
		</div>
		<SearchResultList :items="filterItems" @searchCarDetail="handleSearchCarDetail" />
	</div>
	<Popup03
		v-model:visible="isPopupVisible"
		title="팝업 제목"
		confirmText="확인"
		cancelText="취소"
		@confirm="handleConfirm"
		@cancel="handleCancel"
		:itemDetail="itemDetail"
	>
		<template #content>
			<p>팝업내용.</p>
		</template>
	</Popup03>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import { useRouter, useRoute } from 'vue-router'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'
import { useUtilities } from '@/utils/useUtilities'
import SearchResultList from '@/components/customerkiosk/searchcar/SearchResultList.vue'

export default defineComponent({
	components: {
		SearchResultList,
	},
	name: 'CustomerkioskSearchCarResult',
	setup() {
		const { titleEN } = useTitleEN()
		const router = useRouter()
		const route = useRoute()
		const carsearchParams = computed(() => route.params[0])
		const searchQuery = route.query || ''
		const isPopupVisible = ref(false)
		const customerKioskStore = useCustomerKioskStore()
		const checkItems = ref(0)
		const allCars = ref(0)
		const { sortDataByYearAndAmount } = useUtilities()
		const item = ref(null)
		const itemDetail = ref(null)

		const filterItems = computed(() => {
			if (customerKioskStore.carList.length > 0) {
				allCars.value = customerKioskStore.carList.length
				switch (checkItems.value) {
					case 0:
						return sortDataByYearAndAmount(customerKioskStore.carList, 'hit')
					case 1:
						return sortDataByYearAndAmount(customerKioskStore.carList, 'demoAmt')
					case 2:
						return sortDataByYearAndAmount(customerKioskStore.carList, 'yyyy')
					default:
						return customerKioskStore.carList
				}
			} else {
				return []
			}
		})

		const searchReq = searchQuery => {
			return Object.keys(searchQuery).filter(key => obj[key] !== '')
		}

		const handleSearchCarDetail = carId => {
			isPopupVisible.value = true
			item.value = carId
			searchCarDetailInfo(item.value)
		}

		const keyboardShow = () => {
			carsearchParams.value === '0'
				? router.push('/customerkiosk/searchcarmanufacturer')
				: router.push('/customerkiosk/searchcarnumber')
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

		const resetCarList = () => {
			customerKioskStore.resetCarList()
		}

		onMounted(() => {
			// if (allCars.value === 0) {
			// 	router.push('/customerkiosk/searchcar')
			// }
		})

		onUnmounted(() => {
			resetCarList()
		})

		const checkItemsSel = val => {
			checkItems.value = val
		}

		const searchCarDetailInfo = async item => {
			const res = await customerKioskStore.fetchCarDetailInfo(item.demoNo)
			console.log('resresresresz', res)
			if (res) {
				itemDetail.value = res
			}
		}

		return {
			titleEN,
			router,
			searchQuery,
			searchReq,
			isPopupVisible,
			keyboardShow,
			handleSearchCarDetail,
			item,
			itemDetail,
			handleConfirm,
			handleCancel,
			carsearchParams,
			checkItems,
			checkItemsSel,
			filterItems,
			resetCarList,
			allCars,
			searchCarDetailInfo,
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
</style>
