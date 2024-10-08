<template>
	<div class="keyboard-container absolute bottom-[10vh] w-full">
		<div class="boardInput bg-[#ffffff] 2xl:p-22 p-[1.45vw] pb-[1vw] h-[31vh]">
			<h1 class="tit">DEALER SEARCH</h1>
			<!-- <input type="text" ref="keyboardInput" placeholder="검색어를 입력하세요" readonly /> -->
			<form class="max-w-[35vw] mx-auto relative top-[11vh]">
				<div class="flex h-[8vh]">
					<label for="search-dropdown" class="mb-2 text-[0.8vw] font-medium text-gray-900 sr-only">Your Email</label>
					<button
						id="dropdown-button"
						data-dropdown-toggle="dropdown"
						class="w-[6.5vw] flex justify-center bg-white flex-shrink-0 z-10 inline-flex items-center mr-[0.5vw] text-[1vw] font-medium text-center text-gray-900 border-[0.2vw] border-[#00B0B9] focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-[0.2vw]"
						type="button"
						@click="toggleDropdown"
					>
						{{ selectedOption }}
						<svg
							class="w-[0.7vw] h-[0.7vh] ms-[0.7vw]"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 10 6"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 4 4 4-4"
							/>
						</svg>
					</button>
					<!-- 드롭다운 메뉴 -->
					<div
						v-if="isDropdownOpen"
						class="absolute left-0 top-full z-20 bg-white divide-y divide-gray-100 shadow-lg w-[6vw] rounded-[0.2vw] mt-0"
					>
						<ul class="text-sm text-gray-700">
							<li @click="selectOption('종사원명')">
								<button type="button" class="text-[0.8vw] block w-full text-left px-4 py-[2vh] hover:bg-gray-100">
									종사원명
								</button>
							</li>
							<li @click="selectOption('상사명')">
								<button type="button" class="text-[0.8vw] block w-full text-left px-4 py-[2vh] hover:bg-gray-100">
									상사명
								</button>
							</li>
						</ul>
					</div>
					<div class="relative w-full">
						<input
							type="search"
							ref="keyboardInput"
							id="search-dropdown"
							class="block p-[0.8vw] w-full h-full z-20 text-[1vw] text-gray-900 rounded-[0.2vw] border-[0.2vw] border border-[#00B0B9] focus:ring-blue-500 focus:border-[#00B0B9] placeholder:text-gray-900"
							placeholder="검색어를 입력하세요"
							readonly
							required
						/>
						<button
							type="button"
							class="w-[7vw] absolute flex justify-center items-center top-0 end-0 p-2.5 text-[1vw] font-medium h-full text-white bg-[#00B0B9] rounded-[0.2vw] border border-[#00B0B9] hover:bg-[#169171] focus:ring-4 focus:outline-none focus:bg-[#169171]"
							@click="onEnter(getText())"
						>
							<svg
								class="h-[1.5vh]"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="3"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
							<span class="pl-[0.3vw] text-[1vw] font-[700]">검색</span>
						</button>
					</div>
				</div>
			</form>
		</div>
		<div class="boardWrap bg-[#EBEFF2] h-[58.65vh] 2xl:p-22 p-[2vw] pt-[1vw]">
			<div ref="keyboardZone" class="virtualKeyboard flex justify-center pt-[2.5vh] h-full"></div>
		</div>
	</div>
	<Popup01
		v-model:visible="isPopupVisible"
		title="재검색"
		confirmText="다시 검색하기"
		ico="replay.svg"
		@confirm="handleConfirm"
		@cancel="handleCancel"
	>
		<template #content>
			<p>{{ target }}</p>
			<p>다시 검색해주세요.</p>
		</template>
	</Popup01>
</template>

<script>
import { ref, onMounted, nextTick, computed } from 'vue'
import Hangul from 'hangul-js'
import { useCommonStore } from '@/store/common'
import { useCustomerKioskStore } from '@/store/customerkioskStatus'

export default {
	name: 'KeyboardCustomKeyboard',
	setup() {
		const keyboardInput = ref(null)
		const keyboardZone = ref(null)
		const nowlang = ref('koNormal')
		const charlist = ref([])
		const keydiv = ref({})
		const customerKioskStore = useCustomerKioskStore()

		const selectedOption = ref('종사원명')
		const isDropdownOpen = ref(false)

		//공통팝업용
		const isPopupVisible = ref(false)
		const target = ref(null)

		const form = {
			koNormal: [
				['초기화', '뒤로', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
				['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
				['shift', 'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'backspace'],
				['한/영', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '검색'],
				['space'],
			],
			koShift: [
				['초기화', '뒤로', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
				['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅒ', 'ㅖ'],
				['shift', 'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'backspace'],
				['한/영', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '검색'],
				['space'],
			],
			enNormal: [
				['초기화', '뒤로', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
				['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
				['shift', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'backspace'],
				['한/영', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '검색'],
				['space'],
			],
			enShift: [
				['초기화', '뒤로', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
				['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
				['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'backspace'],
				['한/영', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '검색'],
				['space'],
			],
		}

		onMounted(async () => {
			await nextTick()
			initKeyboard()
		})

		function initKeyboard() {
			const zone = keyboardZone.value
			const input = keyboardInput.value
			const specialKeys = ['shift', 'backspace', '한/영', '초기화', '뒤로', 'space']
			const specialKeysEnter = ['검색']

			for (let index = 0; index < Object.keys(form).length; index++) {
				keydiv.value[Object.keys(form)[index]] = document.createElement('div')
				keydiv.value[Object.keys(form)[index]].style.cssText = `
					position: absolute;
					align: center;
					visibility: hidden;
					font-size: 2vw;
				`
				for (let i = 0; i < form[Object.keys(form)[index]].length; i++) {
					var keyline = document.createElement('table')
					keyline.style.cssText = `
						width: 100%;
						text-align: center;
						margin: 0 0 1.35vh 0;
					`
					for (let j = 0; j < form[Object.keys(form)[index]][i].length; j++) {
						var key = document.createElement('th')
						key.className = 'keybutton'
						key.style.cssText = `
							box-shadow: 0px 0.05vw 0px 0px #00000059;
							background: #fff;
							font-weight: 400;
							border-radius: 0.3vw;
							font-size: 1vw;
							display: inline-block;
							justify-content: center;
							align-items: center;
							padding: 1.1vw 1.7vw;
							margin: 0 0.35vw;
							min-width: 3vw;
						`

						// 설정할 key의 text를 가져온다.
						const keyText = form[Object.keys(form)[index]][i][j]
						key.innerText = keyText

						if (specialKeys.includes(keyText)) {
							key.style.cssText = `
								box-shadow: 0px 0.05vw 0px 0px #00000059;
								background: #DBE2E7;
								border-radius: 0.3vw;
								font-weight: 400;
								font-size: 1vw;
								display: inline-block;
								justify-content: center;
								align-items: center;
								padding: 1.1vw 1.7vw;
								margin: 0 0.35vw;
								min-width: 3vw;
							`
						}

						if (specialKeysEnter.includes(keyText)) {
							key.style.cssText = `
								box-shadow: 0px 0.05vw 0px 0px #00000059;
								background: #00B0B9;
								color: #fff;
								border-radius: 0.3vw;
								font-weight: 700;
								font-size: 1vw;
								display: inline-block;
								justify-content: center;
								align-items: center;
								padding: 1.1vw 1.7vw;
								margin: 0 0.35vw;
								min-width: 3vw;
							`
						}

						// space 키의 경우 너비를 조정
						if (keyText === 'space') {
							key.style.cssText = `
								box-shadow: 0px 0.05vw 0px 0px #00000059;
								background: #DBE2E7;
								border-radius: 0.3vw;
								font-weight: 400;
								font-size: 1vw;
								display: inline-block;
								justify-content: center;
								align-items: center;
								padding: 1.1vw 1.7vw;
								margin: 0 0.35vw;
								width: 15vw; /* 공간 키의 너비를 크게 설정 */
							`
						}

						key.addEventListener('click', keyfun)
						keyline.appendChild(key)
					}
					keydiv.value[Object.keys(form)[index]].appendChild(keyline)
				}
				zone.appendChild(keydiv.value[Object.keys(form)[index]])
			}
			keydiv.value[nowlang.value].style.visibility = 'visible'
		}

		function keyfun(event) {
			const key = event.target.innerText
			if (key === '뒤로') {
				onESC()
				return
			} else if (key === '초기화') {
				resetKeyboard()
				return
			} else if (key === '검색') {
				onEnter(getText())
				return
			} else if (key === '한/영') {
				toggleLang()
				return
			} else if (key === 'shift') {
				toggleShift()
				return
			} else if (key === 'backspace') {
				charlist.value.splice(charlist.value.length - 1, 1)
			} else if (key === 'space') {
				charlist.value.push(' ')
			} else {
				charlist.value.push(key)
			}

			const text = Hangul.assemble(charlist.value)
			keyboardInput.value.value = text
		}

		function toggleLang() {
			keydiv.value[nowlang.value].style.visibility = 'hidden'
			if (nowlang.value === 'koNormal') {
				nowlang.value = 'enNormal'
			} else if (nowlang.value === 'enNormal') {
				nowlang.value = 'koNormal'
			} else if (nowlang.value === 'koShift') {
				nowlang.value = 'enShift'
			} else if (nowlang.value === 'enShift') {
				nowlang.value = 'koShift'
			}
			keydiv.value[nowlang.value].style.visibility = 'visible'
		}

		function toggleShift() {
			keydiv.value[nowlang.value].style.visibility = 'hidden'
			if (nowlang.value === 'koNormal') {
				nowlang.value = 'koShift'
			} else if (nowlang.value === 'enNormal') {
				nowlang.value = 'enShift'
			} else if (nowlang.value === 'koShift') {
				nowlang.value = 'koNormal'
			} else if (nowlang.value === 'enShift') {
				nowlang.value = 'enNormal'
			}
			keydiv.value[nowlang.value].style.visibility = 'visible'
		}

		function onESC() {}

		async function onEnter(text) {
			if (text.length < 2) {
				isPopupVisible.value = true
				resetKeyboard()
				openPop('내용')

				return
			} else {
				if (selectedOption.value === '종사원명') {
					customerKioskStore.resetEmployeeShop('shop')
					const res = await customerKioskStore.fetchEmployee(encodeURIComponent(text))
					if (res.data.length === 0) {
						isPopupVisible.value = true
						resetKeyboard()
						openPop('딜러')
					} else {
						customerKioskStore.setKeyBoardUse(false)
					}
				} else {
					customerKioskStore.resetEmployeeShop('employee')
					const res = await customerKioskStore.fetchShop(encodeURIComponent(text))
					if (res.data.length === 0) {
						isPopupVisible.value = true
						resetKeyboard()
						openPop('상사')
					} else {
						customerKioskStore.setKeyBoardUse(false)
					}
				}
			}
		}

		function getText() {
			return Hangul.assemble(charlist.value)
		}

		function resetKeyboard() {
			charlist.value = []
			keyboardInput.value.value = ''
		}

		function toggleDropdown() {
			isDropdownOpen.value = !isDropdownOpen.value
		}

		function selectOption(option) {
			selectedOption.value = option
			isDropdownOpen.value = false
		}

		const openPop = val => {
			if (val === '딜러') {
				target.value = '딜러 검색 결과가 없습니다.'
			} else if (val === '상사') {
				target.value = '상사 검색 결과가 없습니다.'
			} else {
				target.value = '최소 2글자 이상 입력하신후'
			}
			isPopupVisible.value = true
		}

		//공통팝업용
		const handleConfirm = () => {
			console.log('확인 버튼이 클릭되었습니다.')
			isPopupVisible.value = false // 팝업 닫기
		}
		//공통팝업용
		const handleCancel = () => {
			console.log('취소 버튼이 클릭되었습니다.')
			isPopupVisible.value = false // 팝업 닫기
		}

		return {
			keyboardInput,
			keyboardZone,
			nowlang,
			charlist,
			keydiv,
			initKeyboard,
			keyfun,
			toggleLang,
			toggleShift,
			onESC,
			onEnter,
			getText,
			resetKeyboard,
			selectedOption,
			isDropdownOpen,
			toggleDropdown,
			selectOption,
			isPopupVisible,
			handleConfirm,
			handleCancel,
			target,
			openPop,
		}
	},
}
</script>

<style scoped>
table {
	border-collapse: collapse;
	width: 100%;
}

th {
	border: 1px solid #ddd;
	text-align: center;
	padding: 0.5rem;
	cursor: pointer;
	user-select: none;
	transition:
		background-color 0.2s,
		color 0.2s;
}

th:hover {
	background-color: red !important;
}

th:active {
	background-color: #ccc;
}

.shift,
.lang-switch {
	background-color: #007bff;
	color: #fff;
	font-weight: bold;
	border-radius: 5px;
}

.space {
	background-color: #6c757d;
	color: #fff;
	border-radius: 5px;
}
.keyboard-container {
	background-color: #fff;
	height: calc(100% - 10vh);
	/* display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  position: absolute;
  bottom: 442px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}

/* input {
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
} */

.key-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

.keyline {
	display: flex;
	width: 100%;
}

.key {
	flex: 1;
	margin: 2px;
	text-align: center;
	padding: 10px;
	font-size: 1.2rem;
	border-radius: 5px;
	background-color: #f1f1f1;
	border: 1px solid #ddd;
	cursor: pointer;
	transition:
		background-color 0.2s,
		color 0.2s;
}

.key:hover {
	background-color: #e0e0e0;
}

.key:active {
	background-color: #ccc;
}

.key.special {
	background-color: #007bff;
	color: #fff;
	font-weight: bold;
}

.key.space {
	flex: 2;
	background-color: #6c757d;
	color: #fff;
	font-weight: bold;
	width: 15vw;
}

.key.special:hover,
.key.space:hover {
	background-color: #0056b3;
}

.key.special:active,
.key.space:active {
	background-color: #00408c;
}

.hidden {
	display: none;
}

.virtualKeyboard table th {
	background: red;
	color: red;
}

.keybutton {
	&:active {
		transform: scale(0.95);
	}
}
</style>
