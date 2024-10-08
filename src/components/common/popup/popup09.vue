<template>
	<div v-if="visible" class="fixed inset-0 flex items-center justify-center z-10">
		<div class="absolute inset-0 bg-gray-900 opacity-50"></div>
		<div
			class="bg-white flex rounded-lg shadow-lg p-0 w-[62.5vw] max-w-[62.5vw] h-[26.05vw] relative z-10 bottom-[3vh]"
		>
			<div class="w-3/5 h-full bg-gray-200 flex justify-center items-center">
				<img
					v-if="items.imageUrl && type === 'employee'"
					:src="items.imageUrl"
					:alt="type === 'employee' ? `${items.empName} 종사자 이미지` : `${items.companyName} 상사 이미지`"
					class="w-full h-full block z-10"
				/>
				<img
					v-else
					src="@/assets/img/emptyThumb.svg"
					:alt="type === 'employee' ? `${items.empName} 종사자 이미지` : `${items.companyName} 상사 이미지`"
					class="w-full h-full block z-10"
					style="width: 7vw"
				/>
			</div>
			<div class="w-2/5 h-full">
				<div class="-w-full h-full text-center flex flex-col items-center justify-center">
					<div class="w-full h-full p-[2vw] flex flex-col justify-center items-center" v-if="type === 'employee'">
						<p
							class="text-[0.5w] text-[#00B0B9] py-[0.3vw] px-[0.8vw] rounded-full border border-[#00B0B9] font-normal"
						>
							DEALER
						</p>
						<h3 class="mb-[1.6vw] text-[1.6vw]">{{ items?.empName }}</h3>
						<div class="w-full bg-[#F8F8F8] p-[2vw] rounded-sm">
							<ul class="leading-[2.1vw]">
								<li class="flex text-[0.9vw]" v-if="items.empName">
									<span class="font-bold pr-[2vw]">종사원명</span>
									<span class="font-normal">{{ items.empName }}</span>
								</li>
								<li class="flex text-[0.9vw]" v-if="items.driveNo">
									<span class="font-bold pr-[2vw]">사원증번호</span>
									<span class="font-normal">{{ items.driveNo }}</span>
								</li>
								<li class="flex text-[0.9vw]" v-if="items.companyName">
									<span class="font-bold pr-[2vw]">상사명</span>
									<span class="font-normal">{{ items.companyName }}</span>
								</li>
							</ul>
						</div>
						<!-- <a
							href="#"
							class="mt-[1.6vw] block w-[11.5vw] h-[2.65vw] rounded bg-[#00B0B9] px-3 py-2 font-semibold text-[0.9vw] text-white shadow-sm flex justify-center items-center"
							><img
								src="@/assets/img/store/near_me.svg"
								alt="위치안내 아이콘 이미지"
								class="w-[1.4vw] h-[1.4vw] pr-[0.5vw] block z-10"
							/>위치안내</a
						> -->
					</div>
					<div class="w-full h-full p-[2vw] flex flex-col justify-center items-center" v-else>
						<p
							class="text-[0.5w] text-[#00B0B9] py-[0.3vw] px-[0.8vw] rounded-full border border-[#00B0B9] font-normal"
						>
							STORE
						</p>
						<h3 class="mb-[1.6vw] text-[1.6vw]">{{ items?.companyName }}</h3>
						<div class="w-full bg-[#F8F8F8] p-[2vw] rounded-sm">
							<ul class="leading-[2.1vw]">
								<li class="flex text-[0.9vw]" v-if="items.floorName">
									<span class="font-bold pr-[2vw]">매장위치</span>
									<span class="font-normal">{{ items.floorName }}</span>
								</li>
								<li class="flex text-[0.9vw]" v-if="items.tel">
									<span class="font-bold pr-[2vw]">전화번호</span>
									<span class="font-normal">{{ items.tel }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Close button -->
		<button
			@click="close"
			class="absolute bg-white flex items-center z-50 top-[40vw] justify-center text-gray-400 hover:text-gray-600 w-[2.7vw] h-[2.7vw] rounded-full"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1"
				stroke="currentColor"
				class="w-[2.3vw] h-[2.3vw]"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
	name: 'Popup09',
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
		items: {
			type: Object,
			default: {},
		},
		type: {
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

<style scoped></style>
