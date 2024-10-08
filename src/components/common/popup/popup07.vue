<template>
	<div class="popup absolute top-[50%] left-[50%] z-10">
		<div class="relative bg-white h-full py-[3vh] px-[5.5vw]">
			<p class="text-center text-[#262626] text-[2.5vh] font-bold mb-[2vh]">조회 차량 목록</p>

			<!-- 차량조회 리스트 -->
			<div class="list">
				<div class="flex flex-row">
					<div class="w-[50%] py-[0.8vh] bg-[#273241] text-white font-medium text-center text-[1.7vh]">차량번호</div>
					<div class="w-[50%] py-[0.8vh] bg-[#273241] text-white font-medium text-center text-[1.7vh]">차량명</div>
				</div>
				<div class="cont">
					<div v-for="(car, idx) in carList" :key="idx" class="item flex flex-row" @click="selectedRow = idx">
						<!-- <div
							class="w-[50%] py-[0.8vh] bg-white text-black font-medium text-center text-[1.7vh] border-r-[1px] border-b-[1px] border-[#B7B7B7]"
						> -->
						<div :class="rowClass(selectedRow, idx, 'border-r-[1px]')">
							{{ car.carNo }}
						</div>
						<div :class="rowClass(selectedRow, idx, '')">
							{{ car.modelDetailName }}
						</div>
					</div>
				</div>
			</div>

			<!-- 닫기버튼 -->
			<div class="btn_bar flex flex-row justify-between">
				<button
					class="w-[48%] text-white font-bold bg-[#00ad50]"
					:disabled="selectedRow === null"
					@click="clickSelect()"
				>
					선택
				</button>
				<button class="w-[48%] text-[#262626] font-normal bg-[#fff] border border-[#ccc]" @click="emit('close')">
					닫기
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from 'vue'
import { useInoutKioskStore } from '@/store/inoutKiosk'
const emit = defineEmits(['submit', 'close'])
const inoutStore = useInoutKioskStore()
const carList = inoutStore.getCarList
const selectedRow = ref(null)

const rowClass = (row, idx, plusClass) => {
	return `w-[50%] py-[0.8vh] bg-white text-black font-medium text-center text-[1.7vh] border-r-[1px] border-b-[1px] border-[#B7B7B7] ${plusClass} ${idx === row ? 'selected_row' : ''}`
}

const clickSelect = () => {
	emit('close')
	emit('submit', carList[selectedRow.value])
}
</script>

<style lang="scss" scoped>
.popup {
	width: 80%;
	height: 50%;
	transform: translate(-50%, -50%);
	border-radius: 8px;
	box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
	overflow: hidden;
}

.list {
	width: 100%;
	border: 1px solid #b7b7b7;
	.cont {
		overflow-y: auto;
		height: 27vh;
		background-color: #f8f8f8;
		.item {
			cursor: pointer;
		}
	}
}

.btn_bar {
	position: absolute;
	left: 5.5vw;
	bottom: 2vh;
	width: calc(100% - 11vw);
	button {
		height: 6vh;
		border-radius: 8px;
		font-size: 2vh;
		font-weight: 700;
	}
}

.selected_row {
	background-color: rgb(0 173 80 / var(--tw-bg-opacity));
}
</style>
