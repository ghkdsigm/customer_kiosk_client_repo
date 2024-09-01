<template>
	<div>
		<div class="mb-[3vh] tit_bar">
			<h1 class="tit">{{ titleEN }}</h1>
			<button type="button" class="btn_pre" @click="router.go(-1)">
				<img src="/src/assets/img/icn/chevron_right.svg" aria-hidden />
				이전단계
			</button>
		</div>

		<div class="inner">
			<div class="left">
				<div class="type">
					<span>국산차</span>
					<ul>
						<li class="action">현대</li>
						<li>제네시스</li>
						<li>기아</li>
						<li>쉐보레</li>
						<li>르노삼성</li>
						<li>쌍용</li>
					</ul>
				</div>
				<div class="type">
					<span>수입차</span>
					<ul>
						<li>BMW</li>
						<li>벤츠</li>
						<li>아우디</li>
						<li>폭스바겐</li>
						<li>포드</li>
						<li>크리아슬러</li>
						<li>렉서스</li>
						<li>혼다</li>
						<li>푸조</li>
						<li>테슬라</li>
						<li>기타</li>
					</ul>
				</div>
			</div>

			<div class="right">
				<div class="step">
					<div class="item">
						<p class="tit">STEP 01 모델</p>
						<ul>
							<li>item 01</li>
							<li>item 02</li>
							<li>item 03</li>
							<li>item 04</li>
							<li>item 05</li>
							<li>item 06</li>
							<li>item 07</li>
							<li>item 08</li>
							<li>item 09</li>
							<li>item 10</li>
						</ul>
						<!-- <div class="no_result">제조사를 선택해주세요</div> -->
						<div class="btn_bar">
							<button><img src="/src/assets/img/icn/chevron_top.svg" aria-hidden /></button>
							<button><img src="/src/assets/img/icn/chevron_bottom.svg" aria-hidden /></button>
						</div>
					</div>

					<div class="item">
						<p class="tit">STEP 02 세부모델</p>
						<div class="no_result">대표차명을 선택해주세요</div>
						<div class="btn_bar">
							<button><img src="/src/assets/img/icn/chevron_top.svg" aria-hidden /></button>
							<button><img src="/src/assets/img/icn/chevron_bottom.svg" aria-hidden /></button>
						</div>
					</div>

					<div class="item">
						<p class="tit">STEP 03 등급</p>
						<div class="no_result">모델명을 선택해주세요</div>
						<div class="btn_bar">
							<button><img src="/src/assets/img/icn/chevron_top.svg" aria-hidden /></button>
							<button><img src="/src/assets/img/icn/chevron_bottom.svg" aria-hidden /></button>
						</div>
					</div>
				</div>

				<div class="option">
					<div class="item">
						<p class="tit">변속</p>
						<ul>
							<li class="action">전체</li>
							<li>자동</li>
							<li>수동</li>
						</ul>
					</div>
					<div class="item">
						<p class="tit">연료</p>
						<ul>
							<li>전체</li>
							<li>휘발유</li>
							<li>경유</li>
							<li>LPG</li>
							<li>LPG 겸용</li>
							<li>휘발유 + 전기</li>
							<li>경유 + 전기</li>
							<li>LPG + 전기</li>
							<li>CNG 겸용</li>
							<li>전기(EV)</li>
							<li>기타</li>
						</ul>
					</div>
					<div class="btn_bar">
						<button class="btn_reset">초기화</button>
						<button class="btn_search" @click="searchCars(pageType, 123, 1272, 3507, null, '004001', '005001')">
							검색
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'CustomerkioskSearchCarManufacturer',
	setup() {
		const { titleEN } = useTitleEN()
		const router = useRouter()
		const pageType = ref('0')

		// 각 단계별 데이터
		const brands = ref([
			{ id: 1, name: '현대' },
			{ id: 2, name: '아우디' },
			{ id: 3, name: '벤츠' }
		]);

		const models = ref([
			{ id: 1, brandId: 1, name: '소나타' },
			{ id: 2, brandId: 1, name: '그랜저' },
			{ id: 3, brandId: 2, name: 'Q5' },
			{ id: 4, brandId: 2, name: 'A6' },
			{ id: 5, brandId: 3, name: 'C-Class' },
			{ id: 6, brandId: 3, name: 'E-Class' }
		]);

		const detailModels = ref([
			{ id: 1, modelId: 1, year: '2021' },
			{ id: 2, modelId: 1, year: '2022' },
			{ id: 3, modelId: 2, year: '2020' },
			{ id: 4, modelId: 2, year: '2021' },
			{ id: 5, modelId: 3, year: '2019' },
			{ id: 6, modelId: 3, year: '2020' }
		]);

		const grades = ref([
			{ id: 1, detailModelId: 1, name: '2.4 등급' },
			{ id: 2, detailModelId: 2, name: '3.3 등급' },
			{ id: 3, detailModelId: 3, name: '1.6 등급' },
			{ id: 4, detailModelId: 4, name: '2.0 등급' }
		]);

		const transmissions = ref([
			{ id: 1, type: '수동' },
			{ id: 2, type: '자동' }
		]);

		const fuels = ref([
			{ id: 1, type: '휘발유' },
			{ id: 2, type: '경유' },
			{ id: 3, type: 'LPG' }
		]);

		// 선택된 값
		const selectedBrand = ref(null);
		const selectedModel = ref(null);
		const selectedDetailModel = ref(null);
		const selectedGrade = ref(null);
		const selectedTransmission = ref(null);
		const selectedFuel = ref(null);

		// 필터링된 리스트 계산
		const filteredModels = computed(() => {
		return models.value.filter(model => model.brandId === selectedBrand.value);
		});

		const filteredDetailModels = computed(() => {
		return detailModels.value.filter(detail => detail.modelId === selectedModel.value);
		});

		const filteredGrades = computed(() => {
		return grades.value.filter(grade => grade.detailModelId === selectedDetailModel.value);
		});

		// 선택 변경 핸들러
		const selectBrand = (id) => {
		selectedBrand.value = id;
		resetSelections('brand');
		};

		const selectModel = (id) => {
		selectedModel.value = id;
		resetSelections('model');
		};

		const selectDetailModel = (id) => {
		selectedDetailModel.value = id;
		resetSelections('detailModel');
		};

		const selectGrade = (id) => {
		selectedGrade.value = id;
		resetSelections('grade');
		};

		const selectTransmission = (id) => {
		selectedTransmission.value = id;
		resetSelections('transmission');
		};

		const selectFuel = (id) => {
		selectedFuel.value = id;
		};

		const resetSelections = (fromLevel) => {
		if (fromLevel === 'brand') {
			selectedModel.value = null;
			selectedDetailModel.value = null;
			selectedGrade.value = null;
			selectedTransmission.value = null;
			selectedFuel.value = null;
		} else if (fromLevel === 'model') {
			selectedDetailModel.value = null;
			selectedGrade.value = null;
			selectedTransmission.value = null;
			selectedFuel.value = null;
		} else if (fromLevel === 'detailModel') {
			selectedGrade.value = null;
			selectedTransmission.value = null;
			selectedFuel.value = null;
		} else if (fromLevel === 'grade') {
			selectedTransmission.value = null;
			selectedFuel.value = null;
		} else if (fromLevel === 'transmission') {
			selectedFuel.value = null;
		}
		};

		const searchCars = (type, maker, model, modelDetail, grade, gear, fuel) => {
			const query = {
				maker,
			}
			if (model) {
				query.model = model
			}
			if (modelDetail) {
				query.modelDetail = modelDetail
			}
			if (gear) {
				query.gear = gear
			}
			if (fuel) {
				query.fuel = fuel
			}
			if (grade) {
				query.grade = grade
			}

			router.push({
				name: 'carsearchresults',
				params: type,
				query,
			})
		}
		return {
			titleEN,
			router,
			pageType,
			searchCars,
			brands,
			models,
			detailModels,
			grades,
			transmissions,
			fuels
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
				color: #777;
				font-size: 1.4vh;
				font-weight: 500;
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
					height: 20vh;
				}
				&:nth-child(2) {
					height: 48vh !important;
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
</style>
