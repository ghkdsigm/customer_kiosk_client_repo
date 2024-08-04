<template>
    <!-- Index -->
    <div class="flex h-full justify-center items-center text-4xl">
        emptyHome(test)
      </div>
  </template>
  
  <script>
  import { onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  export default {
    name: 'emptyHome',
    setup() {
        const router = useRouter()

        const handleKeydown = (event) => {
            if (event.ctrlKey && event.key === 'm') {
                router.push('customerkiosk')
            }
        }

        onMounted(() => {
        window.addEventListener('keydown', handleKeydown)
        })

        onUnmounted(() => {
        window.removeEventListener('keydown', handleKeydown)
        })
    }
  }
  </script>
  
  <style>
  
  </style>