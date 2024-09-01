//import { createStore } from 'vuex';
import { defineStore } from 'pinia'
//import createPersistedState from 'vuex-persistedstate';

export const useCommonStore = defineStore('counter', {
  state: () => ({
    openPopup: false
  }),
  actions: {
    checkOpenPopup() {
        return this.openPopup
    },
    setOpenPopup(val) {
        this.openPopup = val
    }  
  }
})