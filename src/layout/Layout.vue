<template>   
    <transition name="route" mode="out-in">
      <component :is="layout"></component>
    </transition>
</template>

<script>
import DefaultLayout from './DefaultLayout.vue'
import SideLayout from './SideLayout.vue'
import EmptyLayout from './EmptyLayout.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: { DefaultLayout, SideLayout, EmptyLayout },
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout || 'DefaultLayout' || 'SideLayout')
    return {
      layout,
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