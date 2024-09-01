<template>
	<div class="flex flex-col h-full">
		<h1 class="tit">{{ titleEN }}</h1>
		<News />
	</div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useTitleEN } from '@/composables/useTitleEN'
import News from '@/components/customerkiosk/news/index.vue'

export default defineComponent({
	name: 'CustomerkioskNews',
	components: {
		News,
	},
	setup() {
		const { titleEN } = useTitleEN()

		return {
			titleEN,
		}
	},
})
</script>

<style></style>
