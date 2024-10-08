<template>
	<div>
		<h1 class="mb-[3vh] tit">{{ titleEN }}</h1>
		<div v-if="isLoading">
			<CarLoading />
		</div>
		<div class="swiper_inner" v-else-if="!isLoading && filteredCompanies.length !== 0">
			<swiper
				:slidesPerView="5"
				:grid="{
					rows: 2,
					fill: 'row',
				}"
				:spaceBetween="100"
				:slides-per-group="5"
				:pagination="pagination"
				:navigation="{
					nextEl: '.arrowRight',
					prevEl: '.arrowLeft',
				}"
				:loop="false"
				:loopFillGroupWithBlank="false"
				:modules="modules"
				class="mySwiper"
			>
				<swiper-slide v-for="(item, idx) in filteredCompanies" :key="idx">
					<StoreCard :item="item" @selectCompany="selectCompany" />
				</swiper-slide>
			</swiper>
			<button class="arrowLeft arrow z-10">
				<img src="@/assets/img/icn/slider_left.svg" alt="left" />
			</button>
			<button class="arrowRight arrow z-10">
				<img src="@/assets/img/icn/slider_right.svg" alt="right" />
			</button>
		</div>
		<div v-else>
			<div class="emptyWrap text-[0.85vw]">조건에 맞는 업체가 존재하지 않습니다.</div>
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
					<StoreKeypad :checkSelect="danjiTitle" @selectedCharacter="selectedCharacter" />
				</div>
			</div>
		</div>
	</div>
	<Popup06
		v-model:visible="isPopupVisible"
		title="팝업 제목"
		confirmText="확인"
		cancelText="취소"
		@confirm="handleConfirm"
		@cancel="handleCancel"
		:items="selectedCompany"
	>
	</Popup06>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'
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
		const customerKioskStore = useCustomerKioskStore()

		const danjiTitle = computed(() => customerKioskStore.danjiTitle)
		const companies = ref([])
		const filteredCompanies = ref([])

		const isLoading = ref(true)
		const isPopupVisible = ref(false)

		const selectedCompany = ref(null)

		// 카테고리 목록
		const options = [
			'전체',
			'매매상사',
			'지원시설',
			'매점',
			'음식점',
			'정비/세차/광택',
			'금융(캐피탈)/보험',
			'신차영업소',
		]
		// 선택된 카테고리 저장
		const selectedCategory = ref(options[0])

		const selectCategory = option => {
			selectedCategory.value = option
		}

		const selectCompany = CompanyNm => {
			isPopupVisible.value = true
			console.log('CompanyNm', CompanyNm)
			selectedCompany.value = CompanyNm
		}

		const fetchCompaniesByTitle = async (danjiTitleValue, gbn) => {
			isLoading.value = true
			try {
				let buildCode = danjiTitleValue === 'HUB' ? '18' : danjiTitleValue === 'TOWER' ? '10' : '11'
				let params = {
					buildCode: buildCode,
					companyGbn: gbn,
				}

				if (params.buildCode !== null) {
					const res = await customerKioskStore.fetchCompanyList(params)
					if (res.length !== 0) {
						companies.value = res
						filteredCompanies.value = res // 초기 companies 리스트 설정
					} else {
						companies.value = []
						filteredCompanies.value = []
					}
				} else {
					alert('단지를 선택 해 주세요.')
				}
			} catch (error) {
				console.error('error', error)
			} finally {
				isLoading.value = false
			}
		}

		watch(
			() => danjiTitle.value,
			newVal => {
				isLoading.value = true
				if (selectedCategory.value === '전체') {
					fetchCompaniesByTitle(newVal, [])
				} else {
					fetchCompaniesByTitle(newVal, selectedCategory.value)
				}
				isLoading.value = false
			},
		)

		watch(
			() => selectedCategory.value,
			newVal => {
				isLoading.value = true
				if (newVal === '전체') {
					fetchCompaniesByTitle(danjiTitle.value, [])
				} else {
					fetchCompaniesByTitle(danjiTitle.value, newVal)
				}
				isLoading.value = false
			},
		)

		onMounted(async () => {
			isLoading.value = true
			await fetchCompaniesByTitle(danjiTitle.value, [])
			isLoading.value = false
		})

		// Keypad에서 선택된 문자에 따라 필터링
		const selectedCharacter = char => {
			filterCompaniesByChar(char)
		}

		// 'All'이나 알파벳/한글 자음에 따라 companies 필터링
		const filterCompaniesByChar = val => {
			let char = String(val)
			console.log('char', char)
			if (char === 'All') {
				filteredCompanies.value = companies.value
			} else {
				filteredCompanies.value = companies.value.filter(item => {
					let companyName = item.companyName.replace(/^\(주\)\s*/, '') // "(주)"를 제거하고 나머지 처리
					const firstChar = companyName.charAt(0) // 회사 이름의 첫 글자

					console.log('firstChar', firstChar)

					// 한글 자음인지 확인하는 정규 표현식
					const isHangulConsonant = /^[ㄱ-ㅎ]$/.test(char)
					const isLatinCharacter = /^[A-Za-z]$/.test(char)

					//console.log('isHangulConsonant', isHangulConsonant)

					if (isHangulConsonant) {
						const initialSound = getInitialSound(firstChar)
						console.log('initialSound', initialSound)
						return initialSound === char // 첫 글자의 자음과 비교
					} else if (isLatinCharacter) {
						return firstChar.toUpperCase() === char.toUpperCase()
					}
					return false
				})
			}
		}

		// 첫 글자의 한글 자음을 추출하는 함수
		const getInitialSound = char => {
			// 한글 음절이 아니면 빈 문자열 반환
			if (char.charCodeAt(0) < 0xac00 || char.charCodeAt(0) > 0xd7a3) {
				return '' // 한글이 아닌 경우
			}

			// 한글 유니코드에서 초성 인덱스 계산
			const unicodeOffset = char.charCodeAt(0) - 0xac00
			const initialSoundIndex = Math.floor(unicodeOffset / 588) // 초성은 588개 단위로 반복됨

			const initialSounds = [
				'ㄱ',
				'ㄲ',
				'ㄴ',
				'ㄷ',
				'ㄸ',
				'ㄹ',
				'ㅁ',
				'ㅂ',
				'ㅃ',
				'ㅅ',
				'ㅆ',
				'ㅇ',
				'ㅈ',
				'ㅉ',
				'ㅊ',
				'ㅋ',
				'ㅌ',
				'ㅍ',
				'ㅎ',
			]

			// 초성 배열에서 초성 반환
			return initialSounds[initialSoundIndex]
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
			danjiTitle,
			isLoading,
			companies,
			filteredCompanies,
			options,
			selectedCategory,
			selectCategory,
			selectedCharacter,
			selectCompany,
			selectedCompany,
			isPopupVisible,
			handleConfirm,
			handleCancel,
			selectedCompany,
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
.emptyWrap {
	padding: 0 7vw;
	height: 61vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.swiper_inner {
	padding: 0 6vw;

	.swiper {
		width: 100%;
		height: 62vh;
		margin: 0 auto;
		:deep(.swiper-wrapper) {
			// width: 100%;
			// height: 62vh;
			// overflow: hidden !important;

			.swiper-slide {
				display: flex;
				height: 26vh !important;
				//height: calc((100% - 40px) / 2) !important;
				margin-top: 0px !important;
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
	bottom: 0.5vh;
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
