<template>
	<div>
		<div class="mb-[3vh] tit_bar">
			<h1 class="tit">{{ titleEN }}</h1>
			<button type="button" class="btn_pre" @click="router.push('/customerkiosk/searchcar')">
				<img src="/src/assets/img/icn/chevron_right.svg" aria-hidden />
				이전단계
			</button>
		</div>

		<div class="inner">
			<!-- 브랜드/국가 -->
			<div class="left scroll">
				<div v-if="!brandLoading">
					<CarLoading />
				</div>
				<div
					v-else
					v-for="(category, categoryKey) in country"
					:key="categoryKey"
					class="mb-[2vh] flex flex-col justify-center items-center"
				>
					<h2 class="text-[1vw] font-bold mb-[1vh] flex justify-center border rounded-full max-w-fit px-[1vw]">
						{{ categoryKey === 'domestic' ? '국산' : '수입' }}차
					</h2>

					<div v-for="(group, groupKey) in category" :key="groupKey" class="w-full">
						<h3
							:class="{
								'text-[0.8vw] font-semibold mb-[0.2vh] flex justify-center rounded-full': groupKey !== 'Top',
								'cursor-pointer': groupKey === 'Etc',
							}"
							@click="toggleGroup(categoryKey, groupKey)"
						>
							{{ groupKey === 'Top' ? '' : '기타' }}
						</h3>

						<ul v-show="groupKey === 'Top' || (groupKey === 'Etc' && isOpen[categoryKey])" class="">
							<li
								v-for="car in group"
								:key="car.carCode"
								class="flex justify-center items-center py-[0.5vh] px-[0.1vw]"
								:class="{
									'bg-[#00969D] text-red-500': selectedCarBrand === car.carCode,
									'bg-[#00969D]': groupKey === 'Etc' && selectedCarBrand !== car.carCode,
								}"
								@click="selectBrand(car)"
							>
								<span class="text-white text-[0.85vw]">{{ car.carCodeName }}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- 스탭 -->
			<div class="right">
				<div class="step">
					<div class="item">
						<p class="tit">STEP 01 모델</p>
						<div v-if="isLoading.model">
							<CarLoading />
						</div>
						<div class="stepScroll scroll" v-else-if="modelData?.length !== 0 && !isLoading.model">
							<ul v-for="(item, idx) in modelData" :key="idx" class="py-[2px]">
								<li
									@click="selectModel(item.carCode)"
									:class="{
										selected: selectedModel === item.carCode,
									}"
								>
									{{ item.carCodeName }}
								</li>
							</ul>
						</div>
						<div v-else class="no_result">대표차명을 선택해주세요</div>
						<div class="btn_bar">
							<button><img src="/src/assets/img/icn/chevron_top.svg" aria-hidden /></button>
							<button><img src="/src/assets/img/icn/chevron_bottom.svg" aria-hidden /></button>
						</div>
					</div>

					<div class="item">
						<p class="tit">STEP 02 세부모델</p>
						<div v-if="isLoading.modelDetail">
							<CarLoading />
						</div>
						<div class="stepScroll scroll" v-else-if="modelDetailData !== null && !isLoading.model">
							<ul v-for="(item, idx) in modelDetailData" :key="idx" class="py-[2px]">
								<li
									@click="selectModelDetail(item.carCode)"
									:class="{
										selected: selectedModelDetail === item.carCode,
									}"
								>
									{{ item.carCodeName }}
								</li>
							</ul>
						</div>
						<div v-else class="no_result">세부모델명을 선택해주세요</div>
						<div class="btn_bar">
							<button><img src="/src/assets/img/icn/chevron_top.svg" aria-hidden /></button>
							<button><img src="/src/assets/img/icn/chevron_bottom.svg" aria-hidden /></button>
						</div>
					</div>

					<div class="item">
						<p class="tit">STEP 03 등급</p>
						<div v-if="isLoading.grade">
							<CarLoading />
						</div>
						<div class="stepScroll scroll" v-else-if="gradeData !== null && !isLoading.modelDetail">
							<ul v-for="(item, idx) in gradeData" :key="idx" class="py-[2px]">
								<li
									@click="selectGrade(item.carCode)"
									:class="{
										selected: selectedGrade === item.carCode,
									}"
								>
									{{ item.carCodeName }}
								</li>
							</ul>
						</div>
						<div v-else class="no_result">등급을 선택해주세요</div>
						<div class="btn_bar">
							<button><img src="/src/assets/img/icn/chevron_top.svg" aria-hidden /></button>
							<button><img src="/src/assets/img/icn/chevron_bottom.svg" aria-hidden /></button>
						</div>
					</div>
				</div>

				<div class="option">
					<div class="item">
						<p class="tit">변속</p>
						<ul class="py-[2px]">
							<li
								class="text-[#777]"
								:class="{
									base: !selectedGear,
									'bg-[#f8f8f8] text-[#00969d] font-bold': selectedGear === 'all',
								}"
								@click="selectGear('all')"
							>
								전체
							</li>
							<li
								v-for="(item, idx) in gearData"
								:key="idx"
								@click="selectGear(item.code)"
								class="text-[#777]"
								:class="{
									selected: selectedGear === item.code,
								}"
							>
								{{ item.codeName }}
							</li>
						</ul>
					</div>
					<div class="item">
						<p class="tit">연료</p>
						<ul class="py-[2px]">
							<li
								class="text-[#777]"
								:class="{
									base: !selectedFuel,
									'bg-[#f8f8f8] text-[#00969d] font-bold': selectedFuel === 'all',
								}"
								@click="selectFuel('all')"
							>
								전체
							</li>
							<li
								v-for="(item, idx) in fuelData"
								:key="idx"
								@click="selectFuel(item.code)"
								class="text-[#777]"
								:class="{
									selected: selectedFuel === item.code,
								}"
							>
								{{ item.codeName }}
							</li>
						</ul>
					</div>
					<div class="btn_bar">
						<button class="btn_reset" @click="resetInfo">초기화</button>
						<button class="btn_search" @click="searchCars()">검색</button>
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
			<p v-if="selectedCarBrand">다시 검색해주세요.</p>
		</template>
	</Popup01>
	<div v-if="listLoading">
		<CarLoading />
	</div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import { useRouter } from 'vue-router'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'

export default defineComponent({
	name: 'CustomerkioskSearchCarManufacturer',
	setup() {
		const { titleEN } = useTitleEN()
		const customerKioskStore = useCustomerKioskStore()
		const router = useRouter()
		const pageType = ref('1')

		//공통팝업용
		const isPopupVisible = ref(false)
		const target = ref(null)

		// 각 단계별 데이터
		const country = ref(null)
		const maker = ref(null)
		const gear = ref(null)
		const fuel = ref(null)
		const makerCode = computed(() => customerKioskStore.makerCode)
		const modelCode = computed(() => customerKioskStore.modelCode)
		const modelDetailCode = computed(() => customerKioskStore.modelDetailCode)
		const gradeCode = computed(() => customerKioskStore.gradeCode)

		const modelData = computed(() => customerKioskStore.models.model)
		const modelDetailData = computed(() => customerKioskStore.models.modelDetail)
		const gradeData = computed(() => customerKioskStore.models.grade)
		const gearData = ref(null)
		const fuelData = ref(null)

		const selectedCarBrand = ref(null)
		const selectedModel = ref(null)
		const selectedModelDetail = ref(null)
		const selectedGrade = ref(null)
		const selectedGear = ref(null)
		const selectedFuel = ref(null)
		const listLoading = ref(false)

		// 로딩 상태
		const isLoading = computed(() => customerKioskStore.isLoading)
		const brandLoading = ref(false)

		onMounted(async () => {
			resetInfo()
			try {
				const params = {
					carCodeType: 'maker',
				}
				const res = await customerKioskStore.fetchCarCodeList(params)
				const gear = await customerKioskStore.fetchCommonCodeList('004')
				const fuel = await customerKioskStore.fetchCommonCodeList('005')
				if (res.length !== 0) {
					brandLoading.value = true
					country.value = res
				}
				gearData.value = gear
				fuelData.value = fuel
				return {
					country,
					gearData,
					fuelData,
				}
			} catch (error) {
				console.error('error', error)
			}
		})

		// 선택 변경
		const selectBrand = makerCode => {
			selectedCarBrand.value = makerCode.carCode

			maker.value = makerCode.carCode
			customerKioskStore.updateCarCode('model', makerCode.carCode)
		}

		const selectModel = modelCode => {
			selectedModel.value = modelCode
			customerKioskStore.updateCarCode('modelDetail', modelCode)
		}

		const selectModelDetail = modelDetailCode => {
			selectedModelDetail.value = modelDetailCode
			customerKioskStore.updateCarCode('grade', modelDetailCode)
		}

		const selectGrade = lastopt => {
			selectedGrade.value = lastopt
			customerKioskStore.updateCarCode('lastopt', lastopt)
		}

		const selectGear = gearCode => {
			selectedGear.value = gearCode
			if (gearCode !== 'all') {
				gear.value = gearCode
			} else {
				gear.value = ''
			}
		}

		const selectFuel = fuelCode => {
			selectedFuel.value = fuelCode
			if (fuelCode !== 'all') {
				fuel.value = fuelCode
			} else {
				fuel.value = ''
			}
		}

		const searchCars = async () => {
			if (!selectedCarBrand.value) {
				isPopupVisible.value = true
				openPop('브랜드')
				return
			}
			try {
				listLoading.value = true
				const query = {}

				if (maker.value) {
					query.makerCode = maker.value
				}
				if (modelCode.value) {
					query.modelCode = modelCode.value
				}
				if (modelDetailCode.value) {
					query.modelDetailCode = modelDetailCode.value
				}
				if (gear.value) {
					query.gearCode = gear.value
				}
				if (fuel.value) {
					query.fuelCode = fuel.value
				}
				if (gradeCode.value) {
					query.gradeCode = gradeCode.value
				}

				console.log('queryqueryqueryqueryquery', query)

				const res = await customerKioskStore.fetchCarList(query)
				if (res.length === 0) {
					isPopupVisible.value = true
					openPop('차량')
				} else {
					router.push({
						name: 'carsearchresults',
						params: '0',
					})
				}
			} catch (error) {
			} finally {
				listLoading.value = false
			}
		}

		const openPop = val => {
			if (val === '딜러') {
				target.value = '딜러 검색 결과가 없습니다.'
			} else if (val === '브랜드') {
				target.value = '브랜드를 선택해주세요'
			} else if (val === '차량') {
				target.value = '차량 검색 결과가 없습니다.'
			} else {
				target.value = '2글자 이상 입력해주세요.'
			}
			isPopupVisible.value = true
		}

		const isOpen = ref({
			domestic: false,
			foreign: false,
		})

		const toggleGroup = (categoryKey, groupKey) => {
			console.log('categoryKey', categoryKey)
			console.log('groupKey', groupKey)
			if (groupKey === 'Etc') {
				isOpen.value[categoryKey] = !isOpen.value[categoryKey]
			}
		}

		const resetInfo = () => {
			customerKioskStore.updateCarCode(null)
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

		return {
			titleEN,
			router,
			pageType,
			isPopupVisible,
			target,
			handleConfirm,
			handleCancel,
			openPop,
			searchCars,
			selectedCarBrand,
			selectedModel,
			selectedModelDetail,
			selectedGrade,
			selectedGear,
			selectedFuel,
			//grades,
			//transmissions,
			//fuels,
			country,
			maker,
			gear,
			fuel,
			gearData,
			fuelData,
			isOpen,
			toggleGroup,
			selectBrand,
			selectModel,
			selectModelDetail,
			selectGrade,
			modelData,
			modelDetailData,
			gradeData,
			isLoading,
			resetInfo,
			selectGear,
			selectFuel,
			makerCode,
			modelCode,
			modelDetailCode,
			gradeCode,
			listLoading,
			brandLoading,
		}
	},
})
</script>

<style lang="scss" scoped>
.tit_bar {
	display: flex;
	justify-content: space-between;

	.btn_pre {
		display: flex;
		padding: 0.7vh 1.2vw;
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
.base {
	color: #00b0b9;
	background-color: #f8f8f8;
	font-weight: bold;
}
.inner {
	display: flex;
	width: 100%;
	height: 75vh;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
	.left {
		width: 12vw;
		height: 100%;
		padding: 2.2vh;
		color: #fff;
		background-color: #00b0b9;
		.type {
			padding: 1.5vh 0;
			text-align: center;
			&:first-child {
				border-bottom: 1px solid #46cbd2;
			}
			span {
				display: inline-block;
				padding: 0.3vh 1vw;
				margin-bottom: 1vh;
				font-size: 1.5vh;
				font-weight: 700;
				border: 1px solid #fff;
				border-radius: 99px;
			}
			li {
				font-size: 1.3vh;
				line-height: 2.3;
				border-radius: 8px;
				cursor: pointer;
				&.action {
					background-color: #00969d;
				}
				&:hover {
					background-color: #2ac4cc91;
				}
			}
		}
	}

	.right {
		display: flex;
		width: calc(100% - 12vw);
		height: 100%;
		padding: 2.4vh 3vh;
		.item {
			position: relative;
			flex: 1 1 0;
			padding: 2.2vh 2vh;
			border: 1px solid #ccc;
			.tit {
				padding: 0 1vw;
				margin-bottom: 1.5vh;
				font-size: 1.5vh;
				font-weight: 700;
			}
			.no_result {
				display: flex;
				height: 90%;
				justify-content: center;
				align-items: center;
				font-size: 1.4vh;
				color: #777;
			}
			li {
				padding: 0 1vw;
				font-size: 1.4vh;
				line-height: 2.3;
				cursor: pointer;
				&.action,
				&:hover {
					color: #00b0b9;
					background-color: #f8f8f8;
					font-weight: 700;
				}
			}

			.btn_bar {
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				border-top: 1px solid #ccc;

				button {
					width: 50%;
					height: 3vh;
					text-align: center;
					background-color: #e6e6e6;
					img {
						display: inline-block;
					}
					&:first-child {
						border-right: 1px solid #ccc;
					}
				}
			}
		}

		.step {
			display: flex;
			column-gap: 10px;
			width: 70%;
		}
		.option {
			display: flex;
			position: relative;
			padding-left: 10px;
			column-gap: 10px;
			width: 30%;
			.item {
				&:first-child {
					height: max-content;
				}
				&:nth-child(2) {
					height: max-content !important;
				}
			}
			.btn_bar {
				display: flex;
				justify-content: space-between;
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 10px;

				button {
					width: 49%;
					height: 4vh;
					font-size: 2vh;
					font-weight: 500;
					border-radius: 4px;
					text-align: center;
					color: #fff;
					&.btn_reset {
						background-color: #434a66;
					}
					&.btn_search {
						background-color: #00b0b9;
					}
				}
			}
		}
	}
}

.result {
	margin-bottom: 2vh;
	font-size: 1.2vh;
	font-weight: 500;
	.count {
		color: #00b0b9;
	}
}

.selected {
	color: #00b0b9 !important;
	background-color: #f8f8f8;
	font-weight: bold !important;
}

.stepScroll {
	height: calc(100% - 7vh);
}

/* 스크롤 숨기기 */
.scroll {
	overflow-y: scroll; /* 세로 스크롤 활성화 */
	-ms-overflow-style: none; /* IE와 Edge에서 스크롤바 숨김 */
	scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
}

.scroll::-webkit-scrollbar {
	display: none; /* Chrome, Safari, Opera에서 스크롤바 숨김 */
}

/* 웹킷 기반 브라우저용 스크롤바 스타일 */
// 아래 주석 풀면 스크롤바 적용
// .scroll::-webkit-scrollbar {
//   width: 10px; /* 스크롤바 너비 */
// }

// .scroll::-webkit-scrollbar-track {
//   background: #f0f0f0; /* 스크롤바 배경 */
//   border-radius: 10px; /* 모서리 둥글게 */
// }

// .scroll::-webkit-scrollbar-thumb {
//   background: #00969D; /* 스크롤바 색상 */
//   border-radius: 10px; /* 모서리 둥글게 */
// }

// .scroll::-webkit-scrollbar-thumb:hover {
//   background: #007B8D; /* 마우스 오버 시 색상 변경 */
// }
// /* Firefox 스크롤바 스타일 */
// .scroll {
//   scrollbar-width: thin; /* 얇은 스크롤바 */
//   scrollbar-color: #00969D #f0f0f0; /* 스크롤바 색상 및 배경 */
// }
</style>
