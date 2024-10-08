<template>
	<!-- Intro -->
	<div class="relative wrapper h-screen">
		<div class="bg absolute top-[0%] left-[50%]" />

		<div class="inner">
			<div class="flex flex-row justify-center btn_bar">
				<button @click="msgDialog = true">팝업확인</button>
			</div>
		</div>
		<Popup08 v-if="msgDialog" @closeDialog="close()" />
	</div>
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'
import Popup08 from '@/components/common/popup/popup08.vue'
import { useInoutKioskStore } from '@/store/inoutKiosk'

const router = useRouter()
const customerKioskStore = useCustomerKioskStore()
const inoutStore = useInoutKioskStore()
const floorInfo = inoutStore.getFloorInfo
const digits = ref(['', '', '', ''])
const msgDialog = ref(false)

if (!floorInfo.floor) goInitPage()

// 처음으로 버튼
const goInitPage = () => {
	router.push({ name: 'inoutkiosk' })
}
// 팝업 닫기
const close = () => {
	msgDialog.value = false
}
// 조회 버튼
const openListDialog = async () => {
	// if (digits.length !== 4) return

	inoutStore.inCarList = []
	let carNo = ''
	digits.value.map(v => (carNo += v))
	const params = {
		locationType: floorInfo.floor,
		carNo: carNo,
	}
	await inoutStore.actCarList(params)

	console.log(inoutStore.getCarList)
	if (inoutStore.getCarList.length) listDialog.value = true
}

const inoutText = floorInfo.inout === 'in' ? '입고' : '출고'
//공통팝업용
const isPopupVisible = ref(false)
const target = ref(null)
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
		}
	}
}
</style>
