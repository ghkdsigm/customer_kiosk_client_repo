<!-- Alert형 팝업 -->
<template>
	<div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
		<div class="absolute inset-0 bg-gray-900 opacity-50"></div>
		<div
			class="flex items-center justify-center flex-col bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-[50.6vw] h-[22.5vw] relative z-10"
		>
			<!-- Popup Title -->
			<h2 class="text-xl font-bold mb-[1.6vw] w-[10.5vw]">
				<img src="@/assets/img/popup/noinfo.png" alt="정보없음" class="w-full h-full" />
			</h2>
			<!-- Popup Content -->
			<div class="mb-[1.6vw] text-center text-[1.5vw]">
				<slot name="content">Default Content</slot>
			</div>
			<!-- Popup Actions -->
			<div class="flex justify-end space-x-4 w-[10.8vw] h-[6.3vh]">
				<button
					@click="confirm"
					class="w-full h-full flex justify-center items-center px-4 py-2 bg-[#00B0B9] text-white rounded text-[0.94vw]"
				>
					<!-- <img v-if="ico" :src="`@/assets/img/popup/${ico}`" class="pr-[0.5vw]" /> -->
					<img src="@/assets/img/popup/replay.svg" class="pr-[0.5vw] w-[1.6vw] h-[1.6vw]" />
					{{ confirmText }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
	name: 'Popup01',
	props: {
		title: {
			type: String,
			default: 'Popup Title',
		},
		confirmText: {
			type: String,
			default: '확인',
		},
		cancelText: {
			type: String,
			default: '취소',
		},
		visible: {
			type: Boolean,
			default: false,
		},
		ico: {
			type: String,
			default: '',
		},
	},
	emits: ['confirm', 'cancel', 'update:visible'],
	setup(props, { emit }) {
		const { title, confirmText, cancelText, visible } = toRefs(props)

		const close = () => {
			emit('update:visible', false)
		}

		const confirm = () => {
			emit('confirm')
			close()
		}

		const cancel = () => {
			emit('cancel')
			close()
		}

		return {
			title,
			confirmText,
			cancelText,
			visible,
			close,
			confirm,
			cancel,
		}
	},
})
</script>

<style scoped>
</style>
