<template>
	<!-- 화면보호기 -->
	<ScreenSaver v-if="currentPath.includes('/customerkiosk')" />
	<Layout></Layout>
</template>

<script>
import { ref, onBeforeMount, onMounted, onUnmounted, computed } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import Layout from '@/layout/Layout.vue'
export default {
	components: {
		Layout,
	},
	setup() {
		const currentRoutes = useRoute()
		const currentPath = computed(() => currentRoutes.path)

		// const preventZoom = event => {
		// 	// 확대/축소 방지
		// 	if (event.ctrlKey || event.type === 'gesturestart') {
		// 		event.preventDefault()
		// 	}
		// }

		// onMounted(() => {
		// 	// 마우스 휠 확대/축소 방지
		// 	document.addEventListener('wheel', preventZoom, { passive: false })
		// 	// 핀치 제스처 확대/축소 방지
		// 	document.addEventListener('gesturestart', preventZoom, { passive: false })
		// })

		// onUnmounted(() => {
		// 	document.removeEventListener('wheel', preventZoom)
		// 	document.removeEventListener('gesturestart', preventZoom)
		// })
		return {
			currentPath,
		}
	},
}
</script>

<style lang="scss">
@import './assets/styles/main';
</style>
