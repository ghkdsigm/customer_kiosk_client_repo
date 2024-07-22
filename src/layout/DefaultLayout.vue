<template>
  <div class="w-full h-full absolute overflow-hidden">
    <!--Main Section-->
    <div class="relative screenArea">      
        <div class="mx-auto h-full" :class="currentPath !== '/' ? '2xl:p-22 p-12' : ''">
            <router-view v-slot="{ Component }">
              <component :is="Component"></component>
            </router-view>
        </div>            
    </div>
    <!--//Main Section-->

    <!--Bottom Menu-->
    <BottomMenu :bottomItems="bottomItems" />   
    <!--//Bottom Menu-->
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, computed } from 'vue'
import router from '../router'
import BottomMenu from '@/components/layout/appbar/bottommenu.vue'
import { useRoute } from 'vue-router';

export default {    
  components: {
    BottomMenu
  },
  setup(){
    const currentRoutes = useRoute()
    const currentPath = computed(() => currentRoutes.path);
    const routes = ref([])  
    //Bottom전용
    const bottomItems = ref([ 
      {
        ico: 'ico_building',
        title: '엠파크안내',
        titleEN: '',
        to: '/mpark',
        state: true
      },
      {
        ico: 'ico_location',
        title: '매장안내',
        titleEN: 'STORE SEARCH',
        to: '/store',
        state: true
      },
      {
        ico: 'ico_car',
        title: '구입차량검색',
        titleEN: 'CAR SEARCH ',
        to: '/searchcar',
        ustatesed: true
      },
      {
        ico: 'ico_person',
        title: '종사원조회',
        titleEN: 'DEALER SEARCH',
        to: '/employee',
        state: true
      },
      {
        ico: 'ico_newspaper',
        title: '한국일보',
        titleEN: 'NEWS ',
        to: '/news',
        state: true
      },
    ])

    onBeforeMount(()=>{
      //routes.value = router.options.routes
      routes.value = router.options.routes.filter((route) => route.meta.isMenu == true)
    });

    onMounted(() => {
    })
    // onBeforeUpdate(() => {
    // })
    // onUpdated(() => {
    // })
    // onBeforeUnmount(() => {
    // })
    // onUnmounted(() => {
    // })

    return {
      routes,
      router,   
      bottomItems,
      currentPath    
    }
  },    
}
</script>

<style scoped>
  .screenArea {
    height:calc(100% - 8rem)
  }
</style>