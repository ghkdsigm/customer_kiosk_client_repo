<template>
	<div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
		<div class="absolute inset-0 bg-gray-900 opacity-50"></div>
		<div class="bg-white rounded-lg shadow-lg p-6 w-[90vw] max-w-[50.6vw] h-[58.6vh] relative z-10">
			<!-- Close button -->
			<button @click="close" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<!-- Popup Title -->
			<h2 class="text-xl font-bold mb-4">{{ title }}</h2>
			<!-- Popup Content -->
			<div class="mb-6">
				<slot name="content">Default Content</slot>
			</div>
			<!-- Popup Actions -->
			<div class="flex justify-end space-x-4">
				<button @click="cancel" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
					{{ cancelText }}
				</button>
				<button @click="confirm" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
					{{ confirmText }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
	name: 'Popup04',
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
