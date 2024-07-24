<template>   
    <transition name="route" mode="out-in">
      <component :is="layout" :bottomItems="bottomItems"></component>
    </transition>
    <!--Bottom Menu-->
    <BottomMenu :bottomItems="bottomItems" />   
    <!--//Bottom Menu-->
</template>

<script>
import DefaultLayout from './DefaultLayout.vue'
import SideLayout from './SideLayout.vue'
import EmptyLayout from './EmptyLayout.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomMenu from '@/components/layout/appbar/bottommenu.vue'

export default {
  components: { DefaultLayout, SideLayout, EmptyLayout, BottomMenu },
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout || 'DefaultLayout' || 'SideLayout')

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
    return {
      layout,
      bottomItems
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