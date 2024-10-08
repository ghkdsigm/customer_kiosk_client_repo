<template>
	<div class="popup absolute top-[50%] left-[50%] z-10">
		<!-- 1. 인증번호가 올바르지 않을때 -->
		<div class="relative bg-white h-full py-[3vh] px-[5.5vw]">
			<div class="icn flex justify-center mb-[1vh]">
				<img v-if="dialogOption.icon === 'error'" src="../../../assets/img/icn/icn_error.svg" />
				<img v-else-if="dialogOption.icon === 'success'" src="../../../assets/img/icn/icn_check_circle.svg" />
				<img v-else-if="dialogOption.icon === 'x'" src="../../../assets/img/icn/icn_close.svg" />
			</div>
			<p v-html="dialogOption.text" class="text-center text-[#262626] text-[2.5vh] font-bold mb-[2vh]" />
			<!-- 인증번호가 <br />
				올바르지 않습니다. -->
			<!-- {{ dialogOption.text }} -->

			<button class="w-[100%] text-white font-bold bg-[#00ad50]" @click="close">확인</button>
		</div>

		<!-- <div class="relative bg-white h-full py-[3vh] px-[5.5vw]">
			<div class="icn flex justify-center mb-[1vh]">
				<img src="../../../assets/img/icn/icn_check_circle.svg" />
			</div>

			<p class="text-center text-[#262626] text-[2.5vh] font-bold mb-[2vh]">
				입고등록이 <br />
				완료되었습니다.
			</p>
		</div>

		<div class="relative bg-white h-full py-[3vh] px-[5.5vw]">
			<div class="icn flex justify-center mb-[0.5vh]">
				<img src="../../../assets/img/icn/icn_close.svg" />
			</div>

			<p class="text-center text-[#262626] text-[2.3vh] font-bold mb-[2vh]">
				입고대기중인 차량이 없거나<br />
				주차위치가 배정되지 않았습니다<br />
				<span class="font-medium">상사로 문의해주세요</span>
			</p>
		</div> -->
	</div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, watch } from 'vue'
import { useInoutKioskStore } from '@/store/inoutKiosk'

const emit = defineEmits(['closeDialog'])
const inoutStore = useInoutKioskStore()
const dialogOption = inoutStore.getDialogOption
// 닫기 버튼
const close = () => {
	if (inoutStore.dialogOption.action) inoutStore.dialogOption.action()
	inoutStore.dialogOption = {
		icon: '',
		text: '',
		dialog: false,
	}
}
</script>

<style lang="scss" scoped>
.popup {
	width: 80%;

	transform: translate(-50%, -50%);
	border-radius: 8px;
	box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
	overflow: hidden;
}

.icn {
	img {
		height: 4vh;
		aspect-ratio: 1/1;
	}
}

button {
	height: 6vh;
	border-radius: 8px;
	font-size: 2vh;
	font-weight: 700;
}
</style>
