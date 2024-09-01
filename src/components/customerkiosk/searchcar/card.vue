<template>
	<div class="w-full h-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
		<div class="block h-[16vh] overflow-hidden">
			<img
				class="w-full h-full object-cover"
				src="https://image.m-park.co.kr/mpark/AttEdit/CarPhoto/Middle/4041501/4041501997R1.jpg"
				alt=""
			/>
		</div>
		<div class="p-[0.5vw] h-[8.5vw] flex flex-col justify-between">
			<h5
				class="text-ellipsis-2-line text-[1vw] font-semibold tracking-tight text-gray-900 dark:text-white leading-[1vw]"
			>
				현대 더뉴그랜저IG 2.5 가솔린 익스클루시브 길어지면 줄여
			</h5>
			<!-- <p class="font-normal text-gray-700 dark:text-gray-400">test2</p> -->
			<p class="text-[0.8vw] text-[#555555] font-normal leading-[0]">
				<span>2022.12</span>
				<span>자동</span>
			</p>
			<p class="text-[0.8vw] text-[#555555] font-normal leading-[0]">
				<span>129,123km</span>
				<span>가솔린 + 전기</span>
			</p>
			<p class="text-[0.8vw] text-[#555555] font-normal leading-[0]">
				<span>전시위치:</span>
				<span>허브</span>
			</p>
			<p class="text-[#00B0B9] font-normal flex justify-end text-[1.1vw] items-center">
				<span class="font-bold text-[1.3vw]">2,400</span><span class="text-[0.8vw] pl-[0.1vw] font-normal">만원</span>
			</p>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'

export default {
	name: 'CustomerKioskSearchCarCard',
	setup() {
		const feature = ref()

		return {}
	},
}
</script>
