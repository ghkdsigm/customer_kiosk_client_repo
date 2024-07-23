<!-- src/components/Popup.vue -->
<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          @click="closePopup"
        >
          &times;
        </button>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Popup",
    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      closePopup() {
        this.$emit('update:isVisible', false);
      },
    },
  };
  </script>
  
  <style scoped>
  </style>