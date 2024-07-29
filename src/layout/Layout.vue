<template>   
    <transition name="route" mode="out-in">
      <component :is="layout" :bottomItems="bottomItems"></component>
    </transition>
    <!--CustomerKiosk Bottom Menu-->
    <BottomMenu :bottomItems="bottomItems" v-if="currentPath.includes('/customerkiosk')" />   
</template>

<script>
import DefaultLayout from '@/layout/customerkiosk/DefaultLayout.vue'
import SideLayout from '@/layout/customerkiosk/SideLayout.vue'
import EmptyLayout from '@/layout/customerkiosk/EmptyLayout.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomMenu from '@/components/layout/appbar/bottommenu.vue'

export default {
  components: { DefaultLayout, SideLayout, EmptyLayout, BottomMenu },
  setup() {
    const route = useRoute()
    const currentPath = computed(() => route.path);
    const layout = computed(() => route.meta.layout || 'DefaultLayout' || 'SideLayout')

    //CustomerKioskBottom 전용
    const bottomItems = ref([
    {
        ico: 'ico_building',
        title: '엠파크안내',
        titleEN: '',
        to: '/customerkiosk/mpark',
        state: true
      },
      {
        ico: 'ico_location',
        title: '매장안내',
        titleEN: 'STORE SEARCH',
        to: '/customerkiosk/store',
        state: true
      },
      {
        ico: 'ico_car',
        title: '구입차량검색',
        titleEN: 'CAR SEARCH ',
        to: '/customerkiosk/searchcar',
        ustatesed: true
      },
      {
        ico: 'ico_person',
        title: '종사원조회',
        titleEN: 'DEALER SEARCH',
        to: '/customerkiosk/employee',
        state: true
      },
      {
        ico: 'ico_newspaper',
        title: '한국일보',
        titleEN: 'NEWS ',
        to: '/customerkiosk/news',
        state: true
      },
    ])
    
    return {
      layout,
      bottomItems,
      currentPath
    }
  },
}
</script>

<style>
/*컴포넌트 이동 트랜지션*/
/* .route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active{
  transition: all 0.1s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active{
  transition: all 0.1s ease-in;
} */
</style>