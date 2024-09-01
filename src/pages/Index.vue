<template>
	<!-- Index(첫진입화면) -->
	<!-- <div class="flex h-full justify-center items-center text-4xl introTest">emptyHome(test)</div> -->

	<div class="flex flex-col h-full justify-center items-center text-4xl introTest">
		<div>테스트버전 빈 화면입니다. 개발 이동을 위해</div>
		<p class="pt-8 text-xl">Ctrl + M 키를 동시에 누르세요 (고객키오스크)</p>
		<p class="pt-4 text-xl">Ctrl + I 키를 동시에 누르세요 (입출고무인화키오스크)</p>
		<p class="pt-4 text-xl">Ctrl + L 키를 동시에 누르세요 (성능상황판)</p>
	</div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
	name: 'emptyHome',
	setup() {
		const router = useRouter()

		const handleKeydown = event => {
			if (event.ctrlKey && (event.key === 'm' || event.key === 'M')) {
				router.push('customerkiosk')
			}
			if (event.ctrlKey && (event.key === 'i' || event.key === 'I')) {
				router.push('inoutkiosk')
			}
			if (event.ctrlKey && (event.key === 'l' || event.key === 'L')) {
				router.push('performancestatus')
			}
		}

		onMounted(() => {
			window.addEventListener('keydown', handleKeydown)
		})

		onUnmounted(() => {
			window.removeEventListener('keydown', handleKeydown)
		})
	},
}
</script>

<style lang="scss"></style>
