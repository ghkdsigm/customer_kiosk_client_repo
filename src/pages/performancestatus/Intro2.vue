<template>
	<!-- Intro -->
	<div class="wrapper flex h-full">성능상황판</div>
	<div>{{ statusList }}</div>
	<div>{{ waitingCarList }}</div>
	<div>{{ inspectionList }}</div>
</template>

<script setup>
import { ref, reactive, defineComponent, onMounted, watch } from 'vue'
import { useStatusStore } from '@/store/performanceStatus'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
const statusList = ref([])
const waitingCarList = ref([])
const inspectionList = ref([])
const statusStore = useStatusStore()
const route = useRoute()
const { id } = route.params

onMounted(async () => {
	await statusStore.actStatusList()
	await statusStore.actWaitingCarList(id)
	await statusStore.actInspectionList(id)
	statusList.value = ref(statusStore.getStatusList)
	waitingCarList.value = ref(statusStore.getWaitingCarList)
	inspectionList.value = ref(statusStore.getInspectionList)
	console.log(statusList, waitingCarList, inspectionList)
})
</script>

<style lang="scss" scoped></style>
