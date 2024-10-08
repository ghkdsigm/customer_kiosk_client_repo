<template>
	<!-- Intro -->
	<div class="relative wrapper h-screen">
		<div class="bg absolute top-[0%] left-[50%]" />

		<div class="inner">
			<div class="logo flex flex-col justify-center mb-[4vh]">
				<img src="../../assets/img/logo_white.svg" class="h-[3vh] mb-[1vh]" />
				<p class="text-center">{{ inoutText }}등록</p>
			</div>

			<div class="num mb-[2.6vh]">{{ digits.join('') }}</div>

			<div class="grid grid-cols-3 gap-5 justify-items-center mb-[3vh]">
				<!-- 1, 2, 3 -->
				<button
					v-for="number in [1, 2, 3]"
					:key="number"
					@click="inputDigit(number)"
					class="keyButton flex items-center justify-center font-bold text-white text-[3.2vh]"
				>
					{{ number }}
				</button>

				<!-- 4, 5, 6 -->
				<button
					v-for="number in [4, 5, 6]"
					:key="number"
					@click="inputDigit(number)"
					class="keyButton flex items-center justify-center font-bold text-white text-[3.2vh]"
				>
					{{ number }}
				</button>

				<!-- 7, 8, 9 -->
				<button
					v-for="number in [7, 8, 9]"
					:key="number"
					@click="inputDigit(number)"
					class="keyButton flex items-center justify-center font-bold text-white text-[3.2vh]"
				>
					{{ number }}
				</button>

				<!-- Del, 0, Reset -->
				<button @click="deleteDigit" class="keyButton flex items-center justify-center text-[#FB4F4F] text-[2vh]">
					삭제
				</button>
				<button
					@click="inputDigit(0)"
					class="keyButton flex items-center justify-center font-bold text-white text-[3.2vh]"
				>
					0
				</button>
				<button @click="resetDigits" class="keyButton flex items-center justify-center text-[#FB4F4F] text-[2vh]">
					전체삭제
				</button>
			</div>

			<div class="flex flex-row justify-between btn_bar">
				<button @click="goInitPage">처음으로</button>
				<button @click="openListDialog">조회</button>
			</div>
		</div>
		<Popup07 v-if="listDialog" @close="listDialog = false" @submit="goNextpage" />
		<Popup08 v-if="inoutStore.dialogOption.dialog" />

		<div class="bottom_deco flex flex-row">
			<div class="left" />
			<div class="right" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Popup07 from '@/components/common/popup/popup07.vue'
import Popup08 from '@/components/common/popup/popup08.vue'
import { useInoutKioskStore } from '@/store/inoutKiosk'

const router = useRouter()
const inoutStore = useInoutKioskStore()
const floorInfo = inoutStore.getFloorInfo
const digits = ref(['', '', '', ''])
const listDialog = ref(false)
if (!floorInfo.floor) goInitPage()

// 처음으로 버튼
const goInitPage = () => {
	router.push({ name: 'inoutkiosk' })
}

// 조회 버튼
const openListDialog = async () => {
	inoutStore.inCarList = []
	let carNo = ''
	digits.value.map(v => (carNo += v))

	if (carNo.length !== 4)
		return (inoutStore.dialogOption = {
			icon: 'x',
			text: `차량번호 4자리를 입력해주세요.`,
			dialog: true,
		})

	const params = {
		locationType: floorInfo.floor,
		carNo: carNo,
	}
	await inoutStore.actCarList(params)

	if (inoutStore.getCarList.length) listDialog.value = true
	else
		return (inoutStore.dialogOption = {
			icon: 'x',
			text: `${inoutText}대기중인 차량이 없거나</br>
				   주차위치가 배정되지 않았습니다.</br>
	   			   <span class="font-medium">상사로 문의해주세요.</span>`,
			dialog: true,
		})
}

// 선택 버튼
const goNextpage = async carInfo => {
	// 입고등록
	if (inoutStore.getFloorInfo.inout === 'in') {
		const params = {
			inCarSeq: carInfo.inCarSeq,
			parkPos: carInfo.parkPos,
		}
		const res = await inoutStore.actCarInOut(params)

		// 차단기 통신
		if (res?.errorCode === 'OK') await inoutStore.openGate()
		else {
			inoutStore.dialogOption = {
				icon: 'success',
				text: res?.errorMessage || `입고할 수 없는<br /> 차량입니다.`,
				dialog: true,
			}
		}
	} else {
		// 출고등록
		inoutStore.carInfo = carInfo
		router.push({ name: 'inoutkioskauthorize' })
	}
}

const inoutText = floorInfo.inout === 'in' ? '입고' : '출고'

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

const resetDigits = () => {
	digits.value = ['', '', '', '']
}
</script>

<style lang="scss" scoped>
.wrapper {
	position: relative !important;
	background-color: #1f2733;
	width: 1082px;
	margin: 0 auto;
	.bg {
		width: 734px;
		height: 409px;
		background: linear-gradient(180deg, #c324c7 0%, #66fbfb 100%);
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		opacity: 0.7;
		transform: translateX(-50%);
		filter: blur(300px);
		border-radius: 727px;
	}

	.inner {
		width: 65%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.bottom_deco {
		width: 100%;
		height: 2vh;
		position: absolute;
		bottom: 0;
		left: 0;
		.left {
			width: 30%;
			height: 2vh;
			margin-right: -4%;
			background-color: #00694d;
			opacity: 0.5;
			border-radius: 0px 25px 25px 0px;
		}
		.right {
			width: 80%;
			height: 2vh;
			background-color: #00ad50;
			border-radius: 25px 0px 0px 25px;
		}
	}
}

.logo {
	p {
		font-size: 4.2vh;
		font-weight: 700;
		color: #fff;
		line-height: 1.2;
	}
}

.num {
	min-height: 9.2vh;
	padding: 2.5vh;
	color: #132f57;
	letter-spacing: 2rem !important;
	text-align: center;
	font-size: 4.2vh;
	font-weight: 700;
	border-radius: 8px;
	background-color: #fff;
	box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.5);
	box-shadow: -0.5px -0.5px 2px 0px rgba(132, 154, 186, 1) inset;
	box-sizing: border-box;
	line-height: 1;
}

.keyButton {
	height: 10vh;
	aspect-ratio: 1/1;
	background-color: #384150;
	border-radius: 100%;
	border: 2px solid #4b6083;
}

.btn_bar {
	button {
		width: 48%;
		height: 5.5vh;
		font-size: 2vh;
		border-radius: 4px;
		&:nth-child(1) {
			background-color: #384150;
			color: #82ff6d;
			border: 2px solid #00ad50;
		}
		&:nth-child(2) {
			color: #fff;
			font-weight: 700;
			background-color: #00ad50;
			border: 2px solid #09ca62;
		}
	}
}
</style>
