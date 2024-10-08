<template>
	<!-- News -->
	<div class="h-full relative">
		<Slider01 :items="items" />
	</div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'
import { storeToRefs } from 'pinia'

export default defineComponent({
	name: 'CustomerKioskNews',
	setup() {
		const customerKioskStore = useCustomerKioskStore()
		const { filteredNews } = storeToRefs(useCustomerKioskStore)
		const items = computed(() => customerKioskStore.news.data)

		onMounted(async () => {
			await customerKioskStore.fetchNews()
		})

		return {
			items,
			filteredNews,
		}
	},
})
</script>

<style scoped></style>
