<template>
	<!-- Index(첫진입화면) -->
	<!-- <div class="flex h-full justify-center items-center text-4xl introTest">emptyHome(test)</div> -->

	<div class="flex flex-col h-full justify-center items-center text-4xl introTest">
		<div>테스트버전 화면입니다. 이동을 위해</div>
		<p class="pt-8 text-xl">Ctrl + M 키를 동시에 누르세요 (고객키오스크)</p>
		<p class="pt-4 text-xl">
			Ctrl + (z: 타워 4층 입고 / x: 타워 4층 출고/ c: 타워 3층 입고 / v: 타워 3층 출고 / a: 허브A / b: 허브B / q: 랜드 )
			키를 동시에 누르세요 (입출고무인화키오스크)
		</p>
		<p class="pt-4 text-xl">Ctrl + ( , : 허브 / . : 랜드 / / : 타워 ) 키를 동시에 누르세요 (성능상황판)</p>
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
			// 무인입출고 타워 4층 입고
			if (event.ctrlKey && (event.key === 'z' || event.key === 'Z')) {
				router.push({ name: 'inoutkiosk', query: { floor: 'T4F', inout: 'in' } })
			}
			// 무인입출고 타워 4층 출고
			if (event.ctrlKey && (event.key === 'x' || event.key === 'X')) {
				router.push({ name: 'inoutkiosk', query: { floor: 'T4F', inout: 'out' } })
			}
			// 무인입출고 타워 3층 입고
			if (event.ctrlKey && (event.key === 'c' || event.key === 'C')) {
				router.push({ name: 'inoutkiosk', query: { floor: 'T3F', inout: 'in' } })
			}
			// 무인입출고 타워 3층 출고
			if (event.ctrlKey && (event.key === 'v' || event.key === 'V')) {
				router.push({ name: 'inoutkiosk', query: { floor: 'T3F', inout: 'out' } })
			}
			// 무인입출고 허브 A
			if (event.ctrlKey && (event.key === 'a' || event.key === 'A')) {
				router.push({ name: 'inoutkiosk', query: { floor: 'HA' } })
			}
			// 무인입출고 허브 B
			if (event.ctrlKey && (event.key === 'b' || event.key === 'B')) {
				router.push({ name: 'inoutkiosk', query: { floor: 'HB' } })
			}
			// 무인입출고 랜드
			if (event.ctrlKey && (event.key === 'q' || event.key === 'Q')) {
				router.push({ name: 'inoutkiosk', query: { floor: 'LA' } })
			}
			// 성능현황판 허브
			if (event.ctrlKey && event.key === ',') {
				router.push({ name: 'introperformancestatus', params: { id: 10 } })
			}
			// 성능현황판 랜드
			if (event.ctrlKey && event.key === '.') {
				router.push({ name: 'introperformancestatus', params: { id: 6 } })
			}
			// 성능현황판 타워
			if (event.ctrlKey && event.key === '/') {
				router.push({ name: 'introperformancestatus', params: { id: 8 } })
			}
			if (event.ctrlKey && (event.key === 'i' || event.key === 'I')) {
				router.push('inoutkiosk')
			}
			if (event.ctrlKey && (event.key === 'm' || event.key === 'M')) {
				router.push('customerkiosk')
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
