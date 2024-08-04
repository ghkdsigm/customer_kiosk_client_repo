<template>
    <div class="keyboard">
      <!-- 초성 -->
      <div class="row">
        <button @click="handleKeyClick('ㄱ')">ㄱ</button>
        <button @click="handleKeyClick('ㄲ')">ㄲ</button>
        <button @click="handleKeyClick('ㄳ')">ㄳ</button>
        <button @click="handleKeyClick('ㄴ')">ㄴ</button>
        <button @click="handleKeyClick('ㄵ')">ㄵ</button>
        <button @click="handleKeyClick('ㄶ')">ㄶ</button>
        <button @click="handleKeyClick('ㄷ')">ㄷ</button>
        <button @click="handleKeyClick('ㄸ')">ㄸ</button>
        <button @click="handleKeyClick('ㄹ')">ㄹ</button>
        <button @click="handleKeyClick('ㄺ')">ㄺ</button>
        <button @click="handleKeyClick('ㄻ')">ㄻ</button>
        <button @click="handleKeyClick('ㄼ')">ㄼ</button>
        <button @click="handleKeyClick('ㄽ')">ㄽ</button>
        <button @click="handleKeyClick('ㄾ')">ㄾ</button>
        <button @click="handleKeyClick('ㄿ')">ㄿ</button>
        <button @click="handleKeyClick('ㅀ')">ㅀ</button>
        <button @click="handleKeyClick('ㅁ')">ㅁ</button>
        <button @click="handleKeyClick('ㅂ')">ㅂ</button>
        <button @click="handleKeyClick('ㅃ')">ㅃ</button>
        <button @click="handleKeyClick('ㅄ')">ㅄ</button>
        <button @click="handleKeyClick('ㅅ')">ㅅ</button>
        <button @click="handleKeyClick('ㅆ')">ㅆ</button>
        <button @click="handleKeyClick('ㅈ')">ㅈ</button>
        <button @click="handleKeyClick('ㅉ')">ㅉ</button>
        <button @click="handleKeyClick('ㅊ')">ㅊ</button>
        <button @click="handleKeyClick('ㅋ')">ㅋ</button>
        <button @click="handleKeyClick('ㅌ')">ㅌ</button>
        <button @click="handleKeyClick('ㅍ')">ㅍ</button>
        <button @click="handleKeyClick('ㅎ')">ㅎ</button>
      </div>
  
      <!-- 중성 -->
      <div class="row">
        <button @click="handleKeyClick('ㅏ')">ㅏ</button>
        <button @click="handleKeyClick('ㅐ')">ㅐ</button>
        <button @click="handleKeyClick('ㅑ')">ㅑ</button>
        <button @click="handleKeyClick('ㅒ')">ㅒ</button>
        <button @click="handleKeyClick('ㅓ')">ㅓ</button>
        <button @click="handleKeyClick('ㅔ')">ㅔ</button>
        <button @click="handleKeyClick('ㅕ')">ㅕ</button>
        <button @click="handleKeyClick('ㅖ')">ㅖ</button>
        <button @click="handleKeyClick('ㅗ')">ㅗ</button>
        <button @click="handleKeyClick('ㅘ')">ㅘ</button>
        <button @click="handleKeyClick('ㅙ')">ㅙ</button>
        <button @click="handleKeyClick('ㅚ')">ㅚ</button>
        <button @click="handleKeyClick('ㅛ')">ㅛ</button>
        <button @click="handleKeyClick('ㅜ')">ㅜ</button>
        <button @click="handleKeyClick('ㅝ')">ㅝ</button>
        <button @click="handleKeyClick('ㅞ')">ㅞ</button>
        <button @click="handleKeyClick('ㅟ')">ㅟ</button>
        <button @click="handleKeyClick('ㅠ')">ㅠ</button>
        <button @click="handleKeyClick('ㅡ')">ㅡ</button>
        <button @click="handleKeyClick('ㅢ')">ㅢ</button>
        <button @click="handleKeyClick('ㅣ')">ㅣ</button>
      </div>
  
      <!-- 종성 -->
      <div class="row">
        <button @click="handleKeyClick('')">-</button> <!-- 빈 종성 -->
        <button @click="handleKeyClick('ㄱ')">ㄱ</button>
        <button @click="handleKeyClick('ㄲ')">ㄲ</button>
        <button @click="handleKeyClick('ㄳ')">ㄳ</button>
        <button @click="handleKeyClick('ㄴ')">ㄴ</button>
        <button @click="handleKeyClick('ㄵ')">ㄵ</button>
        <button @click="handleKeyClick('ㄶ')">ㄶ</button>
        <button @click="handleKeyClick('ㄷ')">ㄷ</button>
        <button @click="handleKeyClick('ㄹ')">ㄹ</button>
        <button @click="handleKeyClick('ㄺ')">ㄺ</button>
        <button @click="handleKeyClick('ㄻ')">ㄻ</button>
        <button @click="handleKeyClick('ㄼ')">ㄼ</button>
        <button @click="handleKeyClick('ㄽ')">ㄽ</button>
        <button @click="handleKeyClick('ㄾ')">ㄾ</button>
        <button @click="handleKeyClick('ㄿ')">ㄿ</button>
        <button @click="handleKeyClick('ㅀ')">ㅀ</button>
        <button @click="handleKeyClick('ㅁ')">ㅁ</button>
        <button @click="handleKeyClick('ㅂ')">ㅂ</button>
        <button @click="handleKeyClick('ㅄ')">ㅄ</button>
        <button @click="handleKeyClick('ㅅ')">ㅅ</button>
        <button @click="handleKeyClick('ㅆ')">ㅆ</button>
        <button @click="handleKeyClick('ㅈ')">ㅈ</button>
        <button @click="handleKeyClick('ㅉ')">ㅉ</button>
        <button @click="handleKeyClick('ㅊ')">ㅊ</button>
        <button @click="handleKeyClick('ㅋ')">ㅋ</button>
        <button @click="handleKeyClick('ㅌ')">ㅌ</button>
        <button @click="handleKeyClick('ㅍ')">ㅍ</button>
        <button @click="handleKeyClick('ㅎ')">ㅎ</button>
      </div>
  
      <!-- 기능 키 -->
      <div class="row">
        <button @click="handleKeyClick('space')">스페이스</button>
        <button @click="handleKeyClick('backspace')">백스페이스</button>
        <button @click="handleKeyClick('enter')">엔터</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
import { isConsonant, isVowel, isJongseong, composeHangul } from '@/utils/hangul'

export default {
  props: {
    input: String
  },
  setup(props, { emit }) {
    const cho = ref('')
    const jung = ref('')
    const jong = ref('')

    const handleKeyClick = (key) => {
      if (key === 'backspace') {
        handleBackspace()
      } else if (key === 'enter') {
        emit('key-click', 'ENTER')
      } else if (key === 'space') {
        emit('key-click', ' ')
      } else {
        handleHangulInput(key)
      }
    }

    const handleBackspace = () => {
      if (jong.value) {
        jong.value = ''
      } else if (jung.value) {
        jung.value = ''
      } else if (cho.value) {
        cho.value = ''
      }
      updateInput()
    }

    const handleHangulInput = (key) => {
      if (key.length === 1 && /[\u3131-\u3163]/.test(key)) { // 자모 범위 체크
        if (isConsonant(key)) { // 초성일 경우
            alert('초성')
          if (!cho.value) {
            cho.value = key
          } else if (jung.value) {
            jong.value = key
          } else {
            cho.value = key
          }
        } else if (isVowel(key)) { // 중성일 경우
            alert('중중성')
          if (cho.value && !jung.value) {
            jung.value = key
          } else {
            emit('key-click', composeHangul(cho.value, jung.value, jong.value))
            cho.value = ''
            jung.value = key
            jong.value = ''
          }
        } else if (isJongseong(key)) { // 종성일 경우
            alert('종성')
          if (cho.value && jung.value) {
            jong.value = key
          } else {
            emit('key-click', composeHangul(cho.value, jung.value, jong.value))
            cho.value = ''
            jung.value = ''
            jong.value = key
          }
        }
        updateInput()
      } else {
        emit('key-click', key)
      }
    }

    const updateInput = () => {
      let composed = ''
      if (cho.value && jung.value) {
        composed = composeHangul(cho.value, jung.value, jong.value)
      }
      emit('key-click', composed)
      cho.value = ''
      jung.value = ''
      jong.value = ''
    }

    return {
      handleKeyClick,
      cho,
      jung,
      jong
    }
  }
}
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  bottom: 130px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}
</style>