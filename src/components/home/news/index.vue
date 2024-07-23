<template>
    <!-- News -->
    <div class="h-full">
      <Slider01 :items="newsItems" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import Slider01 from '@/components/common/slide/slider01.vue'

  export default {
    name: 'HomeNews',
    components: {
      Slider01,
    },
    setup() {
      const newsItems = ref([
        {
          newsTitle: 'test1',
          newsId: '',
          newsContent: 'example01',
          date: ''
        },
        {
          newsTitle: 'test2',
          newsId: '',
          newsContent: 'example02',
          date: ''
        },
        {
          newsTitle: 'test3',
          newsId: '',
          newsContent: 'example01',
          date: ''
        },
        {
          newsTitle: 'test4',
          newsId: '',
          newsContent: 'example02',
          date: ''
        }
      ])
      return {
        newsItems
      };
    },
  }
  </script>
  
  <style scoped>
  
  </style>