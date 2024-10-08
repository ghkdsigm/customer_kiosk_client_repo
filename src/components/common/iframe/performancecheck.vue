<template>
	<div class="w-full container mx-auto h-full">
		<div class="iframe-wrapper h-full">
			<LoadingStatus v-if="isLoading" />
			<iframe
				v-show="!isLoading"
				:src="`https://www.m-park.co.kr/popup/performance/${issueNum}`"
				title="Example Iframe"
				class="w-full h-full border"
				@load="onIframeLoad"
			></iframe>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: 'IframePerformancecheck',
	props: {
		issueNum: {
			type: String,
			default: '',
		},
	},
	components: {},
	setup(props) {
		const isLoading = ref(true)
		const onIframeLoad = () => {
			isLoading.value = false
		}
		return {
			isLoading,
			onIframeLoad,
		}
	},
})
</script>

<style scoped>
.iframe-wrapper {
	width: 100%;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
}
.iframe-wrapper::-webkit-scrollbar {
	width: 8px;
}

.iframe-wrapper::-webkit-scrollbar-thumb {
	background-color: #a0aec0;
	border-radius: 4px;
}

.iframe-wrapper::-webkit-scrollbar-track {
	background-color: #edf2f7;
}
.iframe-wrapper,
iframe {
	touch-action: auto;
}

.loading-spinner {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 400px; /* iframe 높이와 동일하게 설정 */
}
</style>
