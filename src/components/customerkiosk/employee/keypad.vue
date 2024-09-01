<template>
	<div class="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-lg">
		<div class="flex space-x-2 mb-4">
			<div
				v-for="(digit, index) in digits"
				:key="index"
				class="w-12 h-12 flex items-center justify-center bg-white text-xl font-bold border border-gray-300 rounded-md"
			>
				{{ digit }}
			</div>
			<div
				v-for="index in 4 - digits.length"
				:key="index"
				class="w-12 h-12 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md"
			></div>
		</div>
		<div class="grid grid-cols-3 gap-2 mb-4">
			<button
				v-for="number in numbers"
				:key="number"
				@click="inputDigit(number)"
				class="w-16 h-16 flex items-center justify-center bg-blue-500 text-white text-xl font-semibold rounded-md hover:bg-blue-600"
			>
				{{ number }}
			</button>
		</div>
		<div class="flex space-x-2">
			<button @click="deleteDigit" class="w-24 h-12 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600">
				지우기
			</button>
			<button
				@click="resetDigits"
				class="w-24 h-12 bg-[#434A66] text-white font-semibold rounded-md hover:bg-yellow-600"
			>
				초기화
			</button>
			<button
				@click="search"
				:disabled="digits.length !== 4"
				class="w-24 h-12 bg-[#00B0B9] text-white font-semibold rounded-md hover:bg-green-600 disabled:opacity-50"
			>
				검색
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CustomerKioskEmployeeKeypad',
	data() {
		return {
			digits: [],
			numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
		}
	},
	methods: {
		inputDigit(digit) {
			if (this.digits.length < 4) {
				this.digits.push(digit)
			}
		},
		deleteDigit() {
			this.digits.pop()
		},
		resetDigits() {
			this.digits = []
		},
		search() {
			if (this.digits.length === 4) {
				this.$emit('search', this.digits.join(''))
			}
		},
	},
}
</script>
