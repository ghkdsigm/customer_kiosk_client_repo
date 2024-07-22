//import { createStore } from 'vuex';
import { defineStore } from 'pinia'
//import createPersistedState from 'vuex-persistedstate';

export const useMparkStore = defineStore('counter', {
  state: () => ({
    floorTitle: ''
  }),
  actions: {
    checkFloorTitle() {
        return this.floorTitle
    },
    setFloorTitle(newTitle) {
        this.floorTitle = newTitle
    }
  
  }
})