<template>
	<!-- News -->
	<div class="h-full relative">
		<Slider01 :items="items" />
	</div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useMparkStore } from '@/store/mpark'
import { storeToRefs } from 'pinia';

export default defineComponent({
	name: 'CustomerKioskNews',
	setup() {
		const mparkStore = useMparkStore()
		const { filteredNews } = storeToRefs(mparkStore);
		const items = computed(() => mparkStore.news.data)	

		onMounted(() => {
			mparkStore.fetchNews();
		})

		return {
			items,
			filteredNews
		}
	},
})
</script>

<style scoped></style>
