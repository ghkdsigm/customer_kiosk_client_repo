import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({
    openPopup: false,
    isKeyboardVisible: false, // 키보드 표시 상태 추가
  }),
  actions: {
    // 팝업 상태 확인 메서드
    checkOpenPopup() {
      return this.openPopup
    },
    // 팝업 상태 설정 메서드
    setOpenPopup(val) {
      this.openPopup = val
    },
    // 키보드 상태 확인 메서드
    checkKeyboardVisibility() {
      return this.isKeyboardVisible
    },
    // 키보드 상태 설정 메서드
    setKeyboardVisibility(val) {
      this.isKeyboardVisible = val
    },
    // 키보드 토글 메서드 (보이기/숨기기)
    toggleKeyboard() {
      this.isKeyboardVisible = !this.isKeyboardVisible
    },
  },
})