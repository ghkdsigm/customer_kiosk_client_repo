<template>
  <div class="w-full h-full absolute">
    <!--Main Section-->
    <div class="relative screenArea">      
        <div class="mx-auto h-full">
            <router-view v-slot="{ Component }">
              <component :is="Component"></component>
            </router-view>
        </div>            
    </div>
    <!--Bottom Menu-->
    <BottomMenu :bottomItems="bottomItems" />   
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted } from 'vue'
//import router from '../router'
import SideMenu from '../components/layout/appbar/sidemenu.vue'
import BottomMenu from '../components/layout/appbar/bottommenu.vue'

export default {    
  components: {
    BottomMenu,
    SideMenu
  },
  setup(){
    //const routes = ref([])  
    const bottomItems = ref([
      {
        icon: "require('@/assets/img/bottom/ico_building.svg)",
        title: '엠파크안내',
        state: true
      },
      {
        icon: "require('@/assets/img/bottom/ico_location.svg)",
        title: '매장안내',
        state: true
      },
      {
        icon: "require('@/assets/img/bottom/ico_car.svg)",
        title: '구입차량검색',
        ustatesed: true
      },
      {
        icon: "require('@/assets/img/bottom/ico_person.svg)",
        title: '종사원조회',
        state: true
      },
      {
        icon: "require('@/assets/img/bottom/ico_newspaper.svg)",
        title: '한국일보',
        state: true
      },
    ])

    onBeforeMount(()=>{
     // routes.value = router.options.routes.filter((route) => route.meta.isMenu == true)
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
      //router,   
      bottomItems    
    }
  },    
}
</script>

<style scoped>
  .screenArea {
    height:calc(100% - 8rem)
  }

  /*컴포넌트 이동 트랜지션*/
  .route-enter-from {
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
  }
  </style>../components/layout/home/intro.vue