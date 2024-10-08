<template>
	<div class="w-full h-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
		<div class="block h-[15vh] overflow-hidden">
			<img class="w-full h-full object-cover" :src="item?.imageUrl" :alt="item.carName" />
		</div>
		<div class="p-[0.5vw] h-[8.5vw] flex flex-col justify-between">
			<h5
				class="text-ellipsis-2-line text-[1vw] font-semibold tracking-tight text-gray-900 dark:text-white leading-[1vw]"
			>
				{{ item?.carName }}
			</h5>
			<!-- <p class="font-normal text-gray-700 dark:text-gray-400">test2</p> -->
			<p class="text-[0.8vw] text-[#555555] font-normal leading-[0]">
				<span>{{ item?.yymm }}</span>
				<span>{{ item?.autoGbn }}</span>
			</p>
			<p class="text-[0.8vw] text-[#555555] font-normal leading-[0]">
				<span>{{ item?.km }}km</span>
				<span>{{ item?.gasName }}</span>
			</p>
			<p class="text-[0.8vw] text-[#555555] font-normal leading-[0]">
				<span>전시위치:</span>
				<span>{{ item?.parkPlaceName }}</span>
			</p>
			<p class="text-[#00B0B9] font-normal flex justify-end text-[1.1vw] items-center">
				<span class="font-bold text-[1.3vw]">{{ item?.demoAmt }}</span
				><span class="text-[0.8vw] pl-[0.1vw] font-normal">만원</span>
			</p>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'

export default {
	name: 'CustomerKioskSearchCarCard',
	props: {
		item: {
			type: Object,
			default: null,
		},
	},
	setup(props) {
		//const customerKioskStore = useCustomerKioskStore()
		//const data = props.item
		//const detailData = ref(null)
		// async function getDetailInfo() {
		// 	const res = await customerKioskStore.fetchCarDetailInfo(data.demoNo)
		// 	console.log('getDetailInfo', getDetailInfo)
		// 	detailData.value = res
		// }

		// onMounted(() => {
		// 	getDetailInfo()
		// })

		return {
			// getDetailInfo,
			// data,
			// detailData,
		}
	},
}
</script>
