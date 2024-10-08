<template>
	<!-- Intro -->
	<div>
		<MparkStatus v-if="isStatus" :statusList="statusList" @changeSlide="changeStatus()" />
		<InspectionList
			v-else-if="isInspection"
			:inspectionList="inspectionList"
			:danjiName="danjiName"
			@changeSlide="changeInspection()"
		/>
		<WaitingCarList
			v-else="isWaitingCar"
			:waitingCarList="waitingCarList"
			:danjiName="danjiName"
			@changeSlide="changeWaitingCar()"
		/>
	</div>
</template>

<script setup>
import MparkStatus from '@/components/performances/mparkStatus.vue'
import InspectionList from '@/components/performances/inspectionList.vue'
import WaitingCarList from '@/components/performances/waitingCarList.vue'
import { ref, onMounted } from 'vue'
import { useStatusStore } from '@/store/performanceStatus'
import { useRoute } from 'vue-router'

const idMappingObj = {
	6: '랜드',
	8: '타워',
	10: '허브',
}
const statusList = ref([])
const waitingCarList = ref([])
const inspectionList = ref([])
let isStatus = ref(true)
let isInspection = ref(false)
let isWaitingCar = ref(false)
const statusStore = useStatusStore()
const route = useRoute()
const { id } = route.params
const danjiName = idMappingObj[id]

const settingApiData = async () => {
	await statusStore.actStatusList()

	statusList.value = statusStore.getStatusList
	console.log(statusList, inspectionList, waitingCarList)
}

onMounted(async () => {
	await settingApiData()
	requestFullscreen()
})
const changeStatus = async () => {
	await statusStore.actInspectionList(id)
	inspectionList.value = statusStore.getInspectionList

	isStatus.value = false
	isInspection.value = true
	isWaitingCar.value = false

	requestFullscreen()
}
const changeInspection = async () => {
	await statusStore.actWaitingCarList(id)
	waitingCarList.value = statusStore.getWaitingCarList

	isStatus.value = false
	isInspection.value = false
	isWaitingCar.value = true

	requestFullscreen()
}
const changeWaitingCar = async () => {
	await statusStore.actStatusList()
	statusList.value = statusStore.getStatusList

	isStatus.value = true
	isInspection.value = false
	isWaitingCar.value = false

	requestFullscreen()
}

// 전체화면 모드 요청 함수
const requestFullscreen = () => {
	const videoElement = document.documentElement
	const requestFullscreenMethods = [
		videoElement.requestFullscreen,
		videoElement.mozRequestFullScreen,
		videoElement.webkitRequestFullscreen,
		videoElement.msRequestFullscreen,
	]

	for (const method of requestFullscreenMethods) {
		if (method) {
			method.call(videoElement)
			break
		}
	}
}
</script>

<style lang="scss" scoped></style>
