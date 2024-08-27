//import { createStore } from 'vuex';
import { defineStore } from 'pinia'
import http from "@/api/utils/request";

export const useMparkStore = defineStore('mpark', {
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