//import { createStore } from 'vuex';
import { defineStore } from 'pinia'
import http from "@/api/utils/request";

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