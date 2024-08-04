
한글 입력이 "가다마"로 잘못 입력되는 문제는 각 상태 변수 (cho, jung, jong)의 업데이트와 한글 조합 로직에 문제가 있을 수 있습니다. 입력 상태를 명확히 유지하고, 업데이트하는 과정에서의 순서를 재확인해야 합니다.

개선된 코드
먼저 부모 컴포넌트를 수정하고, 그 다음 자식 컴포넌트를 수정하겠습니다.

부모 컴포넌트
vue
코드 복사
<template>
  <div class="search-container" @click.self="hideKeyboard">
    <input
      type="text"
      v-model="query"
      placeholder="검색어를 입력하세요"
      class="search-input"
      readonly
    />
  </div>
  <Search @key-click="handleKeyClick" />
</template>

<script>
import { ref } from 'vue'
import Search from '@/components/common/keyboard/search.vue'
import { composeHangul, isConsonant, isVowel, isJongseong } from '@/utils/hangul'

export default {
  components: {
    Search
  },
  setup() {
    const query = ref('')
    const cho = ref('')
    const jung = ref('')
    const jong = ref('')

    const handleKeyClick = (key) => {
      if (key === 'backspace') {
        handleBackspace()
      } else if (key === 'enter') {
        alert(`검색어: ${query.value}`)
      } else if (key === 'space') {
        query.value += ' '
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
      } else {
        query.value = query.value.slice(0, -1)
      }
      updateQuery()
    }

    const handleHangulInput = (key) => {
      if (key.length === 1 && /[\u3131-\u3163]/.test(key)) {
        if (isConsonant(key)) {
          if (!cho.value) {
            cho.value = key
          } else if (jung.value) {
            jong.value = key
            query.value += composeHangul(cho.value, jung.value, jong.value)
            cho.value = ''
            jung.value = ''
            jong.value = ''
          } else {
            cho.value = key
          }
        } else if (isVowel(key)) {
          if (cho.value && !jung.value) {
            jung.value = key
          } else {
            query.value += composeHangul(cho.value, jung.value, jong.value)
            cho.value = ''
            jung.value = key
            jong.value = ''
          }
        } else if (isJongseong(key)) {
          if (cho.value && jung.value) {
            jong.value = key
            query.value += composeHangul(cho.value, jung.value, jong.value)
            cho.value = ''
            jung.value = ''
            jong.value = ''
          } else {
            query.value += composeHangul(cho.value, jung.value, jong.value)
            cho.value = ''
            jung.value = ''
            jong.value = key
          }
        }
        updateQuery()
      } else {
        query.value += key
      }
    }

    const updateQuery = () => {
      if (cho.value && jung.value) {
        query.value += composeHangul(cho.value, jung.value, jong.value)
        cho.value = ''
        jung.value = ''
        jong.value = ''
      }
    }

    return {
      query,
      handleKeyClick
    }
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  position: absolute;
  bottom: 375px;
}

.search-input {
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
}
</style>