<template>  
  <div class="fixed bottom-0 left-0 z-50 w-full h-32 border-t border-gray-200 bg-primary">
      <div class="grid h-full w-full mx-auto" :class="bottomItems.length ? `grid-cols-${bottomItems.length}` : 'grid-cols-5'">
          <button type="button" class="inline-flex flex-row items-center justify-center px-5 hover:bg-primaryHover group" v-for="(item, idx) in bottomItems" :key="idx" @click="moveToPage(item.to)">
              <img :src="item.ico ? getImageSrc(item.ico) : '@/assets/img/bottom/person.svg'" :alt="item.title" class="w-12 h-12 text-gray-500 group-hover:text-white" />
              <span class="pl-4 text-2xl font-medium text-white  group-hover:text-white">{{ item.title }}</span>
          </button>
      </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'LayoutAppbarBottommenu',
    props: {
        bottomItems: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {       
        const router = useRouter();

        // 동적 이미지 임포트
        const images = import.meta.glob('@/assets/img/bottom/*.svg', { eager: true });
        const getImageSrc = (icon) => {
            const fileName = `/src/assets/img/bottom/${icon}.svg`;
            return images[fileName]?.default || images[fileName];
        }

        const moveToPage = (url) => {
            router.push({ path: url });
        }


        return {       
            getImageSrc,
            moveToPage 
        }
    }
})
</script>

<style scoped>

</style>