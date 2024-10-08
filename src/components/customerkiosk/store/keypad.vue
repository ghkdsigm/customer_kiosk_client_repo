<template>
	<div class="flex items-center justify-between">
		<!-- 탭 -->
		<div class="flex flex-col justify-between mr-[2vw]">
			<button
				class="w-[5vw] text-[1.05vw]"
				@click="selectTab('hangul')"
				:class="tabClasses(selectedTab === 'hangul')"
				type="button"
			>
				ㄱㄴㄷ
			</button>
			<button
				class="w-[5vw] text-[1.05vw]"
				@click="selectTab('alphabet')"
				:class="tabClasses(selectedTab === 'alphabet')"
				type="button"
			>
				ABC
			</button>
		</div>

		<!-- 선택된 탭 내용 -->
		<div v-if="selectedTab === 'hangul'" class="w-full flex flex-wrap justify-end">
			<button
				@click="selectCharacter('All')"
				:class="buttonClasses('All')"
				class="w-[2.8vw] h-[5vh] mr-[1vw] rounded-full text-[1.05vw]"
				type="button"
			>
				All
			</button>
			<button
				v-for="char in hangulChars"
				:key="char"
				@click="selectCharacter(char)"
				:class="buttonClasses(char)"
				class="w-[2.8vw] h-[5vh] mr-[1vw] rounded-full text-[1.05vw]"
				type="button"
			>
				{{ char }}
			</button>
		</div>
		<div v-if="selectedTab === 'alphabet'" class="w-full flex relative items-center">
			<div class="h-full">
				<button
					@click="selectCharacter('All')"
					:class="buttonClasses('All')"
					class="w-[2.8vw] h-[5vh] rounded-full text-[1.05vw] mr-[1vw]"
					type="button"
				>
					All
				</button>
			</div>
			<div class="flex flex-wrap">
				<button
					v-for="char in alphabetChars"
					:key="char"
					@click="selectCharacter(char)"
					:class="buttonClasses(char)"
					class="w-[2.3vw] py-2 rounded-full text-[1.05vw] mr-[1vw]"
					type="button"
				>
					{{ char }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
	name: 'CustomerKioskStoreKeypad',
	props: {
		checkSelect: {
			type: String,
			default: {},
		},
	},
	setup(props, { emit }) {
		// 단지선택 값 감지
		watch(
			() => props.checkSelect,
			newVal => {
				if (newVal) selectTab('hangul')
			},
		)

		// 선택된 탭과 언어
		const selectedTab = ref('hangul')
		const selectedCharacter = ref('All') // 기본값을 'All'로 설정

		// 언어 리스트
		const hangulChars = ref(['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'])
		const alphabetChars = ref([
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
		])

		// 탭 선택
		const selectTab = tab => {
			selectedTab.value = tab
			selectedCharacter.value = 'All' // 탭을 변경할 때 선택된 문자를 기본값 'All'로 설정
		}

		// 문자 선택
		const selectCharacter = char => {
			selectedCharacter.value = char
			emit('selectedCharacter', selectedCharacter.value)
		}

		// 탭 클래스
		const tabClasses = isActive => {
			return isActive
				? 'px-4 py-2 font-semibold bg-[#0C7E60] text-white rounded-t'
				: 'px-4 py-2 font-semibold bg-gray-200 text-gray-700 rounded-t'
		}

		// 버튼 클래스
		const buttonClasses = char => {
			return selectedCharacter.value === char ? 'bg-[#0C7E60] text-white' : 'hover:bg-[#0C7E60] hover:text-white'
		}

		return {
			hangulChars,
			alphabetChars,
			selectedTab,
			selectedCharacter,
			selectTab,
			selectCharacter,
			tabClasses,
			buttonClasses,
		}
	},
})
</script>

<style scoped></style>
