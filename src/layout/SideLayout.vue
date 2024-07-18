<template>
  <div class="">     
    <!--Side Menu-->
    <div class="">
        <SideMenu />   
    </div>
    <!--Main Section-->
    <div class="relative py-6 sm:py-10">      
        <div class="container mx-auto">
            <router-view v-slot="{ Component }">
              <component :is="Component"></component>
            </router-view>
        </div>            
    </div>
    <!--Bottom Menu-->
    <div class="">
        <BottomMenu />   
    </div>
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
  // setup(){
  //   //const routes = ref([])  

  //   onBeforeMount(()=>{
  //    // routes.value = router.options.routes.filter((route) => route.meta.isMenu == true)
  //   });

  //   onMounted(() => {
  //   })
  //   // onBeforeUpdate(() => {
  //   // })
  //   // onUpdated(() => {
  //   // })
  //   // onBeforeUnmount(() => {
  //   // })
  //   // onUnmounted(() => {
  //   // })


  //   return {
  //     //router,       
  //   }
  // },    
}
</script>

<style scoped>
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