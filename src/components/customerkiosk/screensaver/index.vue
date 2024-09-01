<template>
	<div v-if="isActive" class="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
		<video
			ref="videoElement"
			:src="currentVideo"
			class="w-full h-full object-cover"
			autoplay
			muted
			@ended="playNextVideo"
		></video>
	</div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'CustomerKioskScreenSaver',
	setup() {
		const router = useRouter()
		const isActive = ref(false)
		const videos = ref([
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/28e25173-b0be-4a00-9f00-541817625d48-Clip1.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/28e25173-b0be-4a00-9f00-541817625d48-Clip2.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/28e25173-b0be-4a00-9f00-541817625d48-Clip3.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/28e25173-b0be-4a00-9f00-541817625d48-Clip4.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/28e25173-b0be-4a00-9f00-541817625d48-Clip5.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/28e25173-b0be-4a00-9f00-541817625d48-Clip6.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/28e25173-b0be-4a00-9f00-541817625d48-Clip7.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/28e25173-b0be-4a00-9f00-541817625d48-Clip8.mp4',
		])
		const currentVideoIndex = ref(0)
		const currentVideo = ref(videos.value[currentVideoIndex.value])
		let lastInteractionTime = ref(Date.now())

		const playNextVideo = () => {
			currentVideoIndex.value = (currentVideoIndex.value + 1) % videos.value.length
			currentVideo.value = videos.value[currentVideoIndex.value]
		}

		const resetTimer = () => {
			isActive.value = false
			lastInteractionTime.value = Date.now()

			// 새로 타이머를 리셋할 때마다 checkInactivity 호출
			requestAnimationFrame(checkInactivity)
		}

		const checkInactivity = () => {
			const currentTime = Date.now()
			if (currentTime - lastInteractionTime.value >= 300000) {
				// 기본 5분
				isActive.value = true
				currentVideoIndex.value = 0
				currentVideo.value = videos.value[currentVideoIndex.value]

				// 화면 보호기가 꺼질 때 라우터 이동
				router.push('/customerkiosk')
			} else {
				// 다시 requestAnimationFrame 호출하여 다음 프레임에 검사
				requestAnimationFrame(checkInactivity)
			}
		}

		onMounted(() => {
			resetTimer() // 처음 로드될 때 타이머 초기화 및 체크 시작
			window.addEventListener('click', resetTimer)
			window.addEventListener('touchstart', resetTimer)
			window.addEventListener('mousemove', resetTimer)
			window.addEventListener('keydown', resetTimer)
		})

		onBeforeUnmount(() => {
			window.removeEventListener('click', resetTimer)
			window.removeEventListener('touchstart', resetTimer)
			window.removeEventListener('mousemove', resetTimer)
			window.removeEventListener('keydown', resetTimer)
		})

		return {
			isActive,
			currentVideo,
			playNextVideo,
		}
	},
})
</script>

<style scoped></style>
