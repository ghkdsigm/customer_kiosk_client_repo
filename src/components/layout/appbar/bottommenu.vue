<template>  
  <div class="fixed bottom-0 left-0 z-50 w-full h-32 border-t border-gray-200 bg-primary">
      <div class="grid h-full w-full mx-auto" :class="`grid-cols-${bottomItems.length}`">
          <button type="button" class="inline-flex flex-row items-center justify-center px-5 hover:bg-primaryHover group" v-for="(item, idx) in bottomItems" :key="idx">
              <img :src="item.icon" :alt="item.title" class="w-6 h-6 text-gray-500 group-hover:text-white" />
              <span class="pl-2 text-2xl font-medium text-white  group-hover:text-white">{{ item.title }}</span>
          </button>
      </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
    props: {
        bottomItems: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        
        
        // const images = import.meta.glob('@/assets/img/bottom/*.svg', { eager: true })
        // const getImageSrc = (icon) => {
        //     const fileName = `@/assets/img/bottom/${icon}.svg`
        //     return images[fileName]?.default
        // }


        return {            
            //getImageSrc
        }
    }
})
</script>

<style>

</style>