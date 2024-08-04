<template>
    <div class="keyboard">
      <!-- 초성 -->
      <div class="row">
        <button v-for="char in CHO" :key="char" @click="handleKeyClick(char)">{{ char }}</button>
      </div>
  
      <!-- 중성 -->
      <div class="row">
        <button v-for="char in JUNG" :key="char" @click="handleKeyClick(char)">{{ char }}</button>
      </div>
  
      <!-- 종성 -->
      <div class="row">
        <button @click="handleKeyClick('')">-</button> <!-- 빈 종성 -->
        <button v-for="char in JONG" :key="char" @click="handleKeyClick(char)">{{ char }}</button>
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
  import { CHO, JUNG, JONG } from '@/utils/hangul'
  
  export default {
    emits: ['key-click'],
    methods: {
      handleKeyClick(key) {
        this.$emit('key-click', key)
      }
    },
    data() {
      return {
        CHO,
        JUNG,
        JONG
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