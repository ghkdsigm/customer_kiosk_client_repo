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
import { ref, onMounted, onBeforeUnmount, defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'

export default defineComponent({
	name: 'CustomerKioskScreenSaver',
	setup() {
		const customerKioskStore = useCustomerKioskStore()
		const router = useRouter()
		const isActive = ref(false)
		const videos = ref([
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/28e25173-b0be-4a00-9f00-541817625d48-Clip1.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/14357ecc-da7c-414d-aa76-cef216caf798-Clip2.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/720c85a7-54b4-47a4-a7ca-831f7373055a-Clip3.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/bc5fa35c-7727-4bce-b7e7-a95bc94ab599-Clip4.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/7dcccb73-1d83-4225-8c00-01a8e571e82c-Clip5.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/df27e31b-0f13-4748-9296-16146bb99d17-Clip6.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/99fae775-227d-4333-9369-584684224b11-Clip7.mp4',
			'https://image.m-park.co.kr/mpark_test/AttEdit/main/kiosk/257d27f0-cab1-4990-9feb-12393b49021c-Clip8.mp4',
		])
		const currentVideoIndex = ref(0)
		const currentVideo = ref(videos.value[currentVideoIndex.value])
		const videoItems = computed(() => {
			return customerKioskStore.screensaver.map(item => item.url)
		})
		let lastInteractionTime = ref(Date.now())

		const playNextVideo = () => {
			currentVideoIndex.value = (currentVideoIndex.value + 1) % videos.value.length
			currentVideo.value =
				videoItems.length !== 0 ? videoItems.value[currentVideoIndex.value] : videos.value[currentVideoIndex.value]
		}

		const resetTimer = () => {
			isActive.value = false
			lastInteractionTime.value = Date.now()

			// 새로 타이머를 리셋할 때마다 checkInactivity 호출
			requestAnimationFrame(checkInactivity)
		}

		const enterFullscreen = () => {
			const videoElement = document.documentElement
			if (videoElement.requestFullscreen) {
				videoElement.requestFullscreen()
			} else if (videoElement.mozRequestFullScreen) {
				/* Firefox */
				videoElement.mozRequestFullScreen()
			} else if (videoElement.webkitRequestFullscreen) {
				/* Chrome, Safari & Opera */
				videoElement.webkitRequestFullscreen()
			} else if (videoElement.msRequestFullscreen) {
				/* IE/Edge */
				videoElement.msRequestFullscreen()
			}
		}

		const checkInactivity = () => {
			const currentTime = Date.now()
			if (currentTime - lastInteractionTime.value >= 300000) {
				// 기본 5분
				isActive.value = true
				currentVideoIndex.value = 0
				currentVideo.value =
					videoItems.length !== 0 ? videoItems.value[currentVideoIndex.value] : videos.value[currentVideoIndex.value]

				if (!document.fullscreenElement) {
					enterFullscreen()
				}
				// 화면 보호기가 꺼질 때 라우터 이동
				router.push('/customerkiosk')
			} else {
				// 다시 requestAnimationFrame 호출하여 다음 프레임에 검사
				requestAnimationFrame(checkInactivity)
			}
		}

		onMounted(() => {
			customerKioskStore.fetchScreenSaver()

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
			videos,
			videoItems,
		}
	},
})
</script>

<style scoped></style>
